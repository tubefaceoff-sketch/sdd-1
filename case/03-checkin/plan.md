# Plano 03 — Check-in

## Endpoints
| Método | Rota | Entrada | Saída | Erros |
|---|---|---|---|---|
| POST | `/participants/:id/check-in` | Identificador do inscrito | 200: inscrito marcado como presente | 404: `{ "error": "Inscrito não encontrado" }`; 409: `{ "error": "Inscrito não confirmado" }` |
| GET | `/participants/attendance` | — | 200: `{ present: [], absent: [] }`, com confirmados presentes e ausentes | — |

## Modelo em memória
- `checkedIn`: boolean — novo campo; inicia como `false` e passa a `true` quando a chegada é marcada (R9, R10).

## Tela
- A lista de confirmados permite marcar a chegada e identifica quem está presente (R9, R10).
- Uma seção de resultado mostra as pessoas presentes e ausentes ao fim da oficina (R11).
- A fila de espera não aparece no resultado de ausências (R11).

## Decisões técnicas
- Marcar a chegada apenas de inscritos confirmados; rejeitar inscritos não confirmados com status 409 (R9).
- Repetir a marcação retorna sucesso sem alterar o estado já marcado (R10).
- Calcular presentes e ausentes a partir dos confirmados no momento da consulta; ausentes são os que mantêm `checkedIn: false` (R11).

## Dúvidas resolvidas
| Dúvida | Decisão |
|---|---|
| Como indicar que a oficina terminou para consultar ausências? | Consultar o resultado quando a oficina terminar; não exigir uma ação separada de encerramento. (R11) |
