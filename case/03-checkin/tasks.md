# Tarefas 03 — Check-in

- [x] **T1** (R9) Inicializar a situação de chegada como não marcada para cada inscrito — verificar: novo inscrito não consta como presente.
- [x] **T2** (R9) Marcar como presente a chegada de inscrito confirmado — verificar: a ação retorna status 200 e ele aparece entre os presentes.
- [x] **T3** (R9) Recusar a marcação de inscrito inexistente ou não confirmado — verificar: recebe, respectivamente, status 404 ou 409 com erro.
- [x] **T4** (R10) Tornar a marcação de chegada repetida sem efeito — verificar: marcar a chegada duas vezes retorna sucesso e mantém uma única presença.
- [x] **T5** (R11) Obter a lista de presentes e ausentes ao fim da oficina — verificar: confirmados sem chegada marcada ficam ausentes e quem está na fila não aparece.
- [x] **T6** (R9, R10) Mostrar a ação de marcar chegada para confirmados e seu estado de presença na tela — verificar: a lista atualiza após marcar a chegada.
- [x] **T7** (R11) Exibir na tela o resultado de presentes e ausentes — verificar: os nomes correspondem aos grupos retornados, sem pessoas da fila entre os ausentes.
- [x] **T8** (todas) Rodar todos os cenários de aceite da spec — verificar: na tela à mão e, no P5, `npm test` com `fail 0`.
