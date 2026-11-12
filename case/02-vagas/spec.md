# Spec 02 — Vagas

## Objetivo
O organizador acompanha quem está confirmado e quem aguarda uma vaga. Quando uma pessoa confirmada desiste, a primeira pessoa da fila ocupa a vaga.

## Regras de negócio
- **R5** As três primeiras pessoas inscritas ficam confirmadas; as próximas cinco podem ficar na fila de espera, na ordem de inscrição.
- **R6** Quando uma pessoa confirmada desiste, as pessoas confirmadas que estavam depois dela avançam uma posição; a primeira pessoa da fila passa para o fim da lista de confirmados.
- **R7** Quando uma pessoa da fila desiste, ela sai da fila e as pessoas seguintes avançam uma posição; as confirmações não mudam.
- **R8** Quando as cinco vagas e as vinte posições da fila estão ocupadas, novas inscrições são recusadas com a mensagem "Oficina lotada".

## Cenários de aceite
**C1 (R5)** Dado que a oficina está vazia / Quando inscrevo Ana, Bia, Caio e Dani, nessa ordem / Então Ana, Bia e Caio ficam confirmados e Dani fica na fila de espera.

**C2 (R6)** Dado que Ana, Bia e Caio estão confirmados e Dani e Eva estão na fila, nessa ordem / Quando Ana desiste / Então Bia e Caio avançam uma posição, Dani passa para o fim dos confirmados e Eva continua na fila.

**C3 (R7)** Dado que Ana, Bia e Caio estão confirmados e Dani, Eva e Fabio estão na fila, nessa ordem / Quando Eva desiste / Então as confirmações não mudam e Dani e Fabio ficam na fila, nessa ordem e sem lacuna.

**C4 (R8)** Dado que três pessoas estão confirmadas e cinco estão na fila / Quando tento inscrever mais uma pessoa / Então a inscrição é recusada com a mensagem "Oficina lotada" e as listas não mudam.

**C5 (R1, R2, R3, R4, R5, R6, R7, R8)** Dado qualquer estado / Quando verifico o cadastro e a listagem do incremento 1 / Então todos os cenários do incremento 1 continuam valendo.

## Fora de escopo
- Alterar inscrições ou a ordem da fila, exceto pela desistência.
- Marcar presença ou consultar faltas.
- Guardar dados depois que o servidor é desligado.
- Mudar o limite de vagas durante a oficina.

## Dúvidas resolvidas
| Dúvida | Decisão |
|---|---|
| Quantas vagas há e qual o limite da fila? | Manter três vagas confirmadas e no máximo cinco pessoas na fila. |
| O que acontece com as posições após uma desistência? | Se uma pessoa confirmada desistir, as confirmadas seguintes avançam uma posição e a primeira pessoa da fila vai para o fim dos confirmados; se alguém da fila desistir, as pessoas seguintes avançam uma posição, preservando a ordem. |
