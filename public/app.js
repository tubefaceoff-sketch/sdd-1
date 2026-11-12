const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const message = document.getElementById('message');
const confirmedList = document.getElementById('confirmed');
const confirmedTitle = document.getElementById('confirmed-title');
const waitlist = document.getElementById('waitlist');
const waitlistTitle = document.getElementById('waitlist-title');
const attendanceButton = document.getElementById('attendance-button');
const presentList = document.getElementById('present-list');
const absentList = document.getElementById('absent-list');

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function initials(name) {
  return name.trim().split(/\s+/).slice(0, 2).map((word) => word[0]).join('').toUpperCase();
}

function renderItem(participant) {
  const item = el('li', 'bd-list__item');
  item.appendChild(el('span', 'bd-avatar', initials(participant.name)));
  const body = el('div', 'bd-list__body bd-list__body--inline');
  body.appendChild(el('strong', '', participant.name));
  body.appendChild(el('span', '', `— ${participant.email}`));
  item.appendChild(body);
  const isConfirmed = participant.status === 'confirmed';
  const isPresent = isConfirmed && participant.checkedIn;
  item.appendChild(el(
    'span',
    `bd-badge ${isPresent ? 'bd-badge--success' : isConfirmed ? 'bd-badge--info' : 'bd-badge--warning'}`,
    isPresent ? 'Presente' : isConfirmed ? 'Confirmado' : 'Em espera'
  ));
  const actions = el('div', 'bd-list__actions');
  if (isConfirmed && !isPresent) {
    const checkInButton = el('button', 'bd-btn bd-btn--sm bd-btn--success', 'Check-in');
    checkInButton.type = 'button';
    checkInButton.addEventListener('click', () => markArrival(participant.id));
    actions.appendChild(checkInButton);
  }
  const cancelButton = el('button', 'bd-btn bd-btn--sm bd-btn--danger', 'Cancelar');
  cancelButton.type = 'button';
  cancelButton.addEventListener('click', () => cancelParticipant(participant.id));
  actions.appendChild(cancelButton);
  item.appendChild(actions);
  return item;
}

function renderAttendanceList(list, participants, badgeClass, badgeText) {
  if (participants.length === 0) {
    list.replaceChildren(el('li', 'bd-list__empty', 'Ninguém inscrito ainda.'));
    return;
  }

  list.replaceChildren(...participants.map((participant) => {
    const item = el('li', 'bd-list__item');
    item.appendChild(el('span', 'bd-avatar', initials(participant.name)));
    const body = el('div', 'bd-list__body bd-list__body--inline');
    body.appendChild(el('strong', '', participant.name));
    body.appendChild(el('span', '', `— ${participant.email}`));
    item.appendChild(body);
    item.appendChild(el('span', `bd-badge ${badgeClass}`, badgeText));
    return item;
  }));
}

async function errorMessage(response) {
  try {
    const data = await response.json();
    return data.error || 'Não foi possível concluir a solicitação.';
  } catch (error) {
    return 'Não foi possível concluir a solicitação.';
  }
}

function renderGroup(list, title, participants) {
  title.replaceChildren(
    title.id === 'confirmed-title' ? 'Confirmados ' : 'Lista de espera ',
    el('span', 'bd-count', String(participants.length))
  );
  if (participants.length === 0) {
    list.replaceChildren(el('li', 'bd-list__empty', 'Ninguém inscrito ainda.'));
    return;
  }
  list.replaceChildren(...participants.map(renderItem));
}

async function loadGroups() {
  const response = await fetch('/participants/groups');
  if (!response.ok) {
    throw new Error(await errorMessage(response));
  }
  const groups = await response.json();
  if (!Array.isArray(groups.confirmed) || !Array.isArray(groups.waitlist)) {
    throw new Error('Não foi possível carregar os inscritos.');
  }
  renderGroup(confirmedList, confirmedTitle, groups.confirmed);
  renderGroup(waitlist, waitlistTitle, groups.waitlist);
}

async function loadAttendance() {
  const response = await fetch('/participants/attendance');
  if (!response.ok) {
    throw new Error(await errorMessage(response));
  }
  const attendance = await response.json();
  if (!Array.isArray(attendance.present) || !Array.isArray(attendance.absent)) {
    throw new Error('Não foi possível carregar o resultado final.');
  }
  renderAttendanceList(presentList, attendance.present, 'bd-badge--success', 'Presente');
  renderAttendanceList(absentList, attendance.absent, 'bd-badge--neutral', 'Ausente');
}

async function markArrival(id) {
  message.textContent = '';
  try {
    const response = await fetch(`/participants/${encodeURIComponent(id)}/check-in`, { method: 'POST' });
    if (!response.ok) {
      message.textContent = await errorMessage(response);
      return;
    }
    await loadGroups();
    await loadAttendance();
  } catch (error) {
    message.textContent = error.message || 'Não foi possível concluir a solicitação.';
  }
}

async function cancelParticipant(id) {
  message.textContent = '';
  try {
    const response = await fetch(`/participants/${encodeURIComponent(id)}`, { method: 'DELETE' });
    if (!response.ok) {
      message.textContent = await errorMessage(response);
      return;
    }
    await loadGroups();
  } catch (error) {
    message.textContent = error.message || 'Não foi possível concluir a solicitação.';
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  message.textContent = '';
  try {
    const response = await fetch('/participants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nameInput.value, email: emailInput.value })
    });
    if (!response.ok) {
      message.textContent = await errorMessage(response);
      return;
    }
    form.reset();
    await loadGroups();
  } catch (error) {
    message.textContent = error.message || 'Não foi possível concluir a solicitação.';
  }
});

attendanceButton.addEventListener('click', async () => {
  message.textContent = '';
  try {
    await loadAttendance();
  } catch (error) {
    message.textContent = error.message || 'Não foi possível carregar o resultado final.';
  }
});

loadGroups().catch((error) => {
  message.textContent = error.message || 'Não foi possível carregar os inscritos.';
});
