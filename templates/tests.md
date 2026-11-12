# Molde de `tests/NN.test.js` — um teste por cenário de aceite

Regras (valem para todo incremento):
1. **Um `test()` por cenário da spec**, na ordem (C1, C2, ...). O nome do teste é `'C1: <título curto do cenário>'`.
2. O teste nasce da **spec** (o que verificar) e do **plano** (rota, método, código de status). Não leia `server.js` para escrever o teste.
3. Textos de mensagem exatamente como estão na spec (ex.: `'E-mail já cadastrado'`).
4. O cenário "todos os cenários do incremento anterior continuam valendo" **não** vira `test()`: `npm test` já roda os arquivos anteriores.
5. Teste que falha = código errado. Corrija `server.js` (ou `public/app.js`). **Nunca** mude o teste nem a spec para o teste passar.
6. Use só `tests/helpers.js`. Sem dependência nova.

Ajudantes de `tests/helpers.js`:
- `startServer()` → sobe o app com os dados zerados; devolve `{ baseUrl, close }`.
- `postJson(baseUrl, path, body)` → POST com JSON; devolve `{ status, json, text }`.
- `getJson(baseUrl, path)` → GET; devolve `{ status, json, text }`.
- `del(baseUrl, path)` → DELETE; devolve `{ status, json, text }`.
- `request(baseUrl, method, path, body)` → qualquer outro método.

Copie este esqueleto e troque só o número do incremento, os nomes e o corpo dos testes:

```js
// Incremento NN — <nome>. Um teste por cenário da spec (C1–Cn).
const { test, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const { startServer, postJson, getJson, del } = require('./helpers.js');

let srv;
beforeEach(async () => { srv = await startServer(); });
afterEach(async () => { await srv.close(); });

test('C1: lista começa vazia', async () => {
  // Dado: nada cadastrado (startServer já zerou os dados)
  // Quando: abro a lista
  const res = await getJson(srv.baseUrl, '/participants');
  // Então: vazia
  assert.equal(res.status, 200);
  assert.deepEqual(res.json, []);
});

test('C2: cadastro válido aparece na lista', async () => {
  // Dado / Quando
  const created = await postJson(srv.baseUrl, '/participants', { name: 'Ana Lima', email: 'ana@mail.com' });
  // Então
  assert.equal(created.status, 201);
  const list = await getJson(srv.baseUrl, '/participants');
  assert.equal(list.json.length, 1);
  assert.equal(list.json[0].email, 'ana@mail.com');
});

test('C3: cadastro recusado devolve a mensagem da spec', async () => {
  await postJson(srv.baseUrl, '/participants', { name: 'Ana Lima', email: 'ana@mail.com' });
  const dup = await postJson(srv.baseUrl, '/participants', { name: 'Ana L.', email: ' Ana@Mail.com ' });
  assert.equal(dup.status, 409);
  assert.equal(dup.json.error, 'E-mail já cadastrado');
});
```

Como rodar: `npm test` (roda todos os `tests/*.test.js`). Saída esperada: `pass N`, `fail 0`.
