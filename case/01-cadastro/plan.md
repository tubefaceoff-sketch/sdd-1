# Plano 01 — Cadastro e listagem

## Endpoints
| Método | Rota | Entrada | Saída | Erros |
|---|---|---|---|---|
| GET | `/participants` | — | 200: array de inscritos em ordem de cadastro | — |
| POST | `/participants` | JSON `{ "name": "...", "email": "..." }` | 201: inscrito criado | 400: `{ "error": "Nome e e-mail são obrigatórios" }`; 409: `{ "error": "E-mail já cadastrado" }` |

## Modelo em memória
- `name`: string — nome submetido, após validar mínimo de 2 caracteres sem espaços nas pontas.
- `email`: string — e-mail normalizado em minúsculas e sem espaços nas pontas.

## Tela
- Formulário com campos de nome e e-mail para cadastrar um inscrito.
- Lista apresenta nome e e-mail na ordem de cadastro; vazia quando não há inscritos.
- Mensagem de erro visível para cadastro inválido ou e-mail repetido.

## Decisões técnicas
- Manter inscritos em array em memória; responder a listagem diretamente na ordem do array (R3).
- Validar nome após remover espaços nas pontas e exigir e-mail não vazio; não validar formato do e-mail (R1).
- Normalizar e-mail antes de armazenar e comparar duplicidade sem diferenciar caixa ou espaços nas pontas (R2).
- Exibir o erro da API sem alterar a lista em caso de falha (R4).

## Dúvidas resolvidas
| Dúvida | Decisão |
|---|---|
| Como tratar espaços no nome armazenado? | Remover espaços nas pontas apenas para validar; preservar o nome submetido. (R1) |
| Qual formato/status usar na API? | GET retorna array com 200; POST retorna inscrito criado com 201, entrada inválida com 400 e duplicidade com 409. (R1, R2, R3) |
| E-mail precisa ter formato válido? | Não; basta não ser vazio, conforme o escopo da spec. (R1) |
