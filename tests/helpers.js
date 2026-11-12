// Ajudantes dos testes. NÃO EDITE. Sobe o app numa porta livre, com os dados zerados, e devolve a URL base.
const { app, resetData } = require('../server.js');

function startServer() {
  resetData();
  return new Promise((resolve) => {
    const server = app.listen(0, () => {
      const { port } = server.address();
      resolve({
        baseUrl: `http://127.0.0.1:${port}`,
        close: () => new Promise((r) => server.close(r)),
      });
    });
  });
}

// Qualquer método. Devolve { status, json, text }. json é null se a resposta não for JSON.
async function request(baseUrl, method, path, body) {
  const init = { method, headers: {} };
  if (body !== undefined) {
    init.headers['content-type'] = 'application/json';
    init.body = typeof body === 'string' ? body : JSON.stringify(body);
  }
  const res = await fetch(baseUrl + path, init);
  const text = await res.text();
  let json = null;
  try { json = JSON.parse(text); } catch { /* não-JSON */ }
  return { status: res.status, json, text };
}

const postJson = (baseUrl, path, body) => request(baseUrl, 'POST', path, body);
const getJson = (baseUrl, path) => request(baseUrl, 'GET', path);
const del = (baseUrl, path) => request(baseUrl, 'DELETE', path);

module.exports = { startServer, request, postJson, getJson, del };
