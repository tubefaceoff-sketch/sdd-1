# Tarefas 02 — Vagas

- [x] **T1** (R5) Acrescentar identificador e situação de confirmação ao inscrito — verificar: cada inscrito tem identificador único e situação confirmada ou em espera.
- [x] **T2** (R5) Confirmar as três primeiras inscrições e colocar as cinco seguintes na fila, em ordem — verificar: inscrever oito pessoas produz três confirmadas e cinco em espera.
- [x] **T3** (R8) Recusar novas inscrições quando as vagas e a fila estiverem cheias — verificar: a 9ª inscrição recebe status 409 e `"Oficina lotada"`, sem alterar as listas.
- [x] **T4** (R5) Expor as listas de confirmados e de espera mantendo a listagem existente — verificar: grupos retornam separados e ordenados, e a listagem anterior segue disponível.
- [x] **T5** (R6, R7) Implementar desistência de inscrito existente — verificar: a desistência remove a pessoa e a resposta tem status 204; identificador inexistente retorna 404.
- [x] **T6** (R6) Ao desistir alguém confirmado, avançar os confirmados seguintes e promover a primeira pessoa da fila ao fim dos confirmados — verificar: removendo Ana da ordem Ana, Bia, Caio, Dani, Eva, os confirmados ficam Bia, Caio, Dani e Eva continua na fila.
- [x] **T7** (R7) Reordenar a fila após desistência de pessoa em espera — verificar: as pessoas seguintes avançam uma posição e as confirmações não mudam.
- [x] **T8** (R5) Exibir as listas de confirmados e de espera com suas contagens — verificar: inscrições aparecem no grupo e na ordem corretos.
- [x] **T9** (R6, R7) Permitir desistência na tela e atualizar as listas após a ação — verificar: a lista mostra os confirmados seguintes avançando e a primeira pessoa da fila no fim dos confirmados; desistência na fila compacta somente a fila.
- [x] **T10** (R8) Mostrar na tela a mensagem da API ao tentar inscrição com oficina lotada — verificar: aparece `"Oficina lotada"` e as listas permanecem iguais.
- [x] **T11** (todas) Rodar todos os cenários de aceite da spec — verificar: na tela à mão e, no P5, `npm test` com `fail 0`.
