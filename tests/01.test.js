// Incremento 01 — Cadastro e listagem. Um teste por cenário da spec (C1–C6).
const { test, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const { startServer, postJson, getJson } = require('./helpers.js');

let srv;
beforeEach(async () => { srv = await startServer(); });
afterEach(async () => { await srv.close(); });

test('C1: lista começa vazia', async () => {
  const res = await getJson(srv.baseUrl, '/participants');
  assert.equal(res.status, 200);
  assert.deepEqual(res.json, []);
});

test('C2: cadastro válido aparece na lista', async () => {
  const created = await postJson(srv.baseUrl, '/participants', { name: 'Ana Lima', email: 'ana@mail.com' });
  assert.equal(created.status, 201);
  const list = await getJson(srv.baseUrl, '/participants');
  assert.equal(list.status, 200);
  assert.deepEqual(list.json, [{ name: 'Ana Lima', email: 'ana@mail.com' }]);
});

test('C3: e-mail duplicado é recusado', async () => {
  await postJson(srv.baseUrl, '/participants', { name: 'Ana Lima', email: 'ana@mail.com' });
  const duplicate = await postJson(srv.baseUrl, '/participants', { name: 'Ana L.', email: ' Ana@Mail.com ' });
  assert.equal(duplicate.status, 409);
  assert.equal(duplicate.json.error, 'E-mail já cadastrado');
  const list = await getJson(srv.baseUrl, '/participants');
  assert.equal(list.status, 200);
  assert.equal(list.json.length, 1);
});

test('C4: nome inválido é recusado', async () => {
  const existing = { name: 'Bia', email: 'bia@mail.com' };
  await postJson(srv.baseUrl, '/participants', existing);
  for (const name of ['', 'A']) {
    const invalid = await postJson(srv.baseUrl, '/participants', { name, email: 'valid@mail.com' });
    assert.equal(invalid.status, 400);
    assert.equal(invalid.json.error, 'Nome e e-mail são obrigatórios');
    const list = await getJson(srv.baseUrl, '/participants');
    assert.equal(list.status, 200);
    assert.deepEqual(list.json, [existing]);
  }
});

test('C5: e-mail é armazenado normalizado', async () => {
  const created = await postJson(srv.baseUrl, '/participants', { name: 'Bia', email: ' BIA@Mail.com ' });
  assert.equal(created.status, 201);
  const list = await getJson(srv.baseUrl, '/participants');
  assert.equal(list.status, 200);
  assert.equal(list.json[0].email, 'bia@mail.com');
});

test('C6: lista mantém a ordem de cadastro', async () => {
  const ana = await postJson(srv.baseUrl, '/participants', { name: 'Ana', email: 'ana@mail.com' });
  const bia = await postJson(srv.baseUrl, '/participants', { name: 'Bia', email: 'bia@mail.com' });
  assert.equal(ana.status, 201);
  assert.equal(bia.status, 201);
  const list = await getJson(srv.baseUrl, '/participants');
  assert.equal(list.status, 200);
  assert.deepEqual(list.json.map((participant) => participant.name), ['Ana', 'Bia']);
});
