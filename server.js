// Esqueleto do case "Inscrições da Oficina".
// Os incrementos da spec vão adicionar rotas aqui. Não mude a porta nem a estrutura.
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const CONFIRMED_CAPACITY = 3;
const WAITLIST_CAPACITY = 5;

// Dados em memória. Um array, nada mais.
let participants = [];
let nextParticipantId = 1;

function resetData() {
  participants = [];
  nextParticipantId = 1;
}

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.get('/participants', (req, res) => {
  res.json(participants.map(({ name, email }) => ({ name, email })));
});

app.get('/participants/groups', (req, res) => {
  res.json({
    confirmed: participants.filter((participant) => participant.status === 'confirmed'),
    waitlist: participants.filter((participant) => participant.status === 'waitlist')
  });
});

app.get('/participants/attendance', (req, res) => {
  const confirmed = participants.filter((participant) => participant.status === 'confirmed');
  res.json({
    present: confirmed.filter((participant) => participant.checkedIn),
    absent: confirmed.filter((participant) => !participant.checkedIn)
  });
});

app.post('/participants', (req, res) => {
  const { name, email } = req.body || {};
  if (typeof name !== 'string' || name.trim().length < 2 ||
      typeof email !== 'string' || email.trim().length === 0) {
    return res.status(400).json({ error: 'Nome e e-mail são obrigatórios' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (participants.some((participant) => participant.email === normalizedEmail)) {
    return res.status(409).json({ error: 'E-mail já cadastrado' });
  }

  if (participants.length >= CONFIRMED_CAPACITY + WAITLIST_CAPACITY) {
    return res.status(409).json({ error: 'Oficina lotada' });
  }

  const confirmedCount = participants.filter((participant) => participant.status === 'confirmed').length;
  const participant = {
    id: nextParticipantId++,
    name,
    email: normalizedEmail,
    status: confirmedCount < CONFIRMED_CAPACITY ? 'confirmed' : 'waitlist',
    checkedIn: false
  };
  participants.push(participant);
  return res.status(201).json(participant);
});

app.post('/participants/:id/check-in', (req, res) => {
  const participantId = Number(req.params.id);
  const participant = participants.find((entry) => entry.id === participantId);
  if (!Number.isInteger(participantId) || !participant) {
    return res.status(404).json({ error: 'Inscrito não encontrado' });
  }
  if (participant.status !== 'confirmed') {
    return res.status(409).json({ error: 'Inscrito não confirmado' });
  }

  participant.checkedIn = true;
  return res.json(participant);
});

app.delete('/participants/:id', (req, res) => {
  const participantId = Number(req.params.id);
  const participantIndex = participants.findIndex((participant) => participant.id === participantId);
  if (!Number.isInteger(participantId) || participantIndex === -1) {
    return res.status(404).json({ error: 'Inscrito não encontrado' });
  }

  const [participant] = participants.splice(participantIndex, 1);
  if (participant.status === 'confirmed') {
    const nextInLine = participants.find((entry) => entry.status === 'waitlist');
    if (nextInLine) {
      nextInLine.status = 'confirmed';
    }
  }

  return res.status(204).end();
});

module.exports = { app, resetData };

if (require.main === module) {
  app.listen(3000, () => {
    console.log('Inscrições da Oficina rodando em http://localhost:3000');
  });
}
