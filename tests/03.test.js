// Incremento 03 — Check-in. Um teste por cenário da spec (C1–C3).
const { test, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const { startServer, postJson, getJson, request } = require('./helpers.js');

let srv;
beforeEach(async () => { srv = await startServer(); });
afterEach(async () => { await srv.close(); });

async function register(name) {
  const email = `${name.toLowerCase()}@mail.com`;
  const response = await postJson(srv.baseUrl, '/participants', { name, email });
  assert.equal(response.status, 201);
  return response.json;
}

async function checkIn(id) {
  return request(srv.baseUrl, 'POST', `/participants/${id}/check-in`);
}

test('C1: chegada marcada consta como presente', async () => {
  const ana = await register('Ana');
  const response = await checkIn(ana.id);
  assert.equal(response.status, 200);
  assert.equal(response.json.checkedIn, true);

  const attendance = await getJson(srv.baseUrl, '/participants/attendance');
  assert.equal(attendance.status, 200);
  assert.deepEqual(attendance.json.present.map((person) => person.name), ['Ana']);
});

test('C2: marcar chegada novamente não altera a situação', async () => {
  const ana = await register('Ana');
  const first = await checkIn(ana.id);
  assert.equal(first.status, 200);
  const second = await checkIn(ana.id);
  assert.equal(second.status, 200);
  assert.equal(second.json.checkedIn, true);

  const attendance = await getJson(srv.baseUrl, '/participants/attendance');
  assert.equal(attendance.status, 200);
  assert.deepEqual(attendance.json.present.map((person) => person.name), ['Ana']);
});

test('C3: resultado final separa presentes e ausentes', async () => {
  const ana = await register('Ana');
  const bia = await register('Bia');
  await register('Caio');
  await register('Dani');
  const arrived = await checkIn(bia.id);
  assert.equal(arrived.status, 200);

  const attendance = await getJson(srv.baseUrl, '/participants/attendance');
  assert.equal(attendance.status, 200);
  assert.deepEqual(attendance.json.present.map((person) => person.name), ['Bia']);
  assert.deepEqual(attendance.json.absent.map((person) => person.name), ['Ana', 'Caio']);
  assert.equal(attendance.json.absent.some((person) => person.id === ana.id), true);
  assert.equal(attendance.json.absent.some((person) => person.name === 'Dani'), false);
});
