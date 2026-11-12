// Incremento 02 — Vagas. Um teste por cenário da spec (C1–C4).
const { test, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const { startServer, postJson, getJson, del } = require('./helpers.js');

let srv;
beforeEach(async () => { srv = await startServer(); });
afterEach(async () => { await srv.close(); });

async function register(name) {
  const email = `${name.toLowerCase().replace(/\s+/g, '.')}@mail.com`;
  const response = await postJson(srv.baseUrl, '/participants', { name, email });
  assert.equal(response.status, 201);
  return response.json;
}

test('C1: inscrições ocupam vagas e iniciam a fila', async () => {
  for (const name of ['Ana', 'Bia', 'Caio', 'Dani']) {
    await register(name);
  }
  const groups = await getJson(srv.baseUrl, '/participants/groups');
  assert.equal(groups.status, 200);
  assert.deepEqual(groups.json.confirmed.map((person) => person.name), ['Ana', 'Bia', 'Caio']);
  assert.deepEqual(groups.json.waitlist.map((person) => person.name), ['Dani']);
});

test('C2: desistência de confirmada promove a próxima pessoa', async () => {
  const participants = [];
  for (const name of ['Ana', 'Bia', 'Caio', 'Dani', 'Eva']) {
    participants.push(await register(name));
  }
  const cancelled = await del(srv.baseUrl, `/participants/${participants[0].id}`);
  assert.equal(cancelled.status, 204);
  const groups = await getJson(srv.baseUrl, '/participants/groups');
  assert.equal(groups.status, 200);
  assert.deepEqual(groups.json.confirmed.map((person) => person.name), ['Bia', 'Caio', 'Dani']);
  assert.deepEqual(groups.json.waitlist.map((person) => person.name), ['Eva']);
});

test('C3: desistência na fila ajusta as posições seguintes', async () => {
  const participants = [];
  for (const name of ['Ana', 'Bia', 'Caio', 'Dani', 'Eva', 'Fabio']) {
    participants.push(await register(name));
  }
  const cancelled = await del(srv.baseUrl, `/participants/${participants[4].id}`);
  assert.equal(cancelled.status, 204);
  const groups = await getJson(srv.baseUrl, '/participants/groups');
  assert.equal(groups.status, 200);
  assert.deepEqual(groups.json.confirmed.map((person) => person.name), ['Ana', 'Bia', 'Caio']);
  assert.deepEqual(groups.json.waitlist.map((person) => person.name), ['Dani', 'Fabio']);
});

test('C4: oficina lotada recusa nova inscrição sem alterar as listas', async () => {
  for (let index = 1; index <= 8; index += 1) {
    await register(`Pessoa ${index}`);
  }
  const before = await getJson(srv.baseUrl, '/participants/groups');
  assert.equal(before.status, 200);
  const full = await postJson(srv.baseUrl, '/participants', { name: 'Pessoa 9', email: 'pessoa.9@mail.com' });
  assert.equal(full.status, 409);
  assert.equal(full.json.error, 'Oficina lotada');
  const after = await getJson(srv.baseUrl, '/participants/groups');
  assert.equal(after.status, 200);
  assert.deepEqual(after.json, before.json);
});
