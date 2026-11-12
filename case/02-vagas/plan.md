# Plano 02 — Vagas

## Endpoints
| Método | Rota | Entrada | Saída | Erros |
|---|---|---|---|---|
| GET | `/participants` | — | 200: inscritos em ordem, preservando a listagem do incremento 1 | — |
| GET | `/participants/groups` | — | 200: `{ confirmed: [], waitlist: [] }`, grupos em ordem de inscrição | — |
| POST | `/participants` | JSON `{ "name": "...", "email": "..." }` | 201: inscrito com grupo atribuído | 400: `{ "error": "Nome e e-mail são obrigatórios" }`; 409: `{ "error": "E-mail já cadastrado" }` ou `{ "error": "Oficina lotada" }` |
| DELETE | `/participants/:id` | Identificador do inscrito | 204: desistência concluída | 404: `{ "error": "Inscrito não encontrado" }` |

## Modelo em memória
- `id`: número — identificador único do inscrito.
- `name`: string — nome do inscrito.
- `email`: string — e-mail normalizado, único.
- `status`: string — `confirmed` ou `waitlist`; indica o grupo atual do inscrito.
- Capacidade: três pessoas confirmadas e até cinco na fila.

## Tela
- Duas listas com contagem: confirmados e fila de espera.
- Cada inscrito exibe nome e e-mail; ação de desistência disponível em ambos os grupos.
- Ao desistir alguém confirmado, mostrar os confirmados seguintes avançando uma posição e a primeira pessoa da fila no fim dos confirmados.

## Decisões técnicas
- Manter `GET /participants` compatível com a listagem do incremento 1 e usar `/participants/groups` para exibir os dois grupos (R3, R5).
- Atribuir as três primeiras inscrições ao grupo confirmado e até cinco seguintes à fila, respeitando a ordem; depois disso, recusar novas inscrições (R5, R8).
- Preservar a ordem de inscrição no array; ao remover alguém confirmado, promover a primeira pessoa da fila sem movê-la de posição no array, para que os grupos mostrem os confirmados seguintes avançando e a promovida no fim dos confirmados (R6). Ao remover alguém da fila, manter a ordem dos demais (R7).
- Retornar 404 ao solicitar desistência de inscrito inexistente (R6, R7).

## Dúvidas resolvidas
| Dúvida | Decisão |
|---|---|
| Qual limite aplicar? | Usar três vagas confirmadas e até cinco posições na fila, sem configuração adicional. (R5, R8) |
