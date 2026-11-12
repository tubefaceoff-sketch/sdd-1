# Spec 03 — Check-in

## Objetivo
No dia da oficina, o organizador marca a chegada das pessoas confirmadas e, ao terminar, consulta quem faltou.

## Regras de negócio
- **R9** A chegada pode ser marcada para uma pessoa confirmada; ela passa a constar como presente.
- **R10** Marcar a chegada de uma pessoa presente novamente não altera sua situação nem gera erro.
- **R11** Ao terminar a oficina, são consideradas ausentes as pessoas confirmadas cuja chegada não foi marcada; pessoas na fila de espera não entram nessa lista.

## Cenários de aceite
**C1 (R9)** Dado que Ana está confirmada e ainda não chegou / Quando marco sua chegada / Então Ana consta como presente.

**C2 (R10)** Dado que Ana já consta como presente / Quando marco sua chegada novamente / Então Ana continua presente e não ocorre erro.

**C3 (R11)** Dado que Ana, Bia e Caio estão confirmados, somente Bia chegou, e Dani está na fila / Quando a oficina termina / Então Ana e Caio constam como ausentes, Bia consta como presente e Dani não aparece entre os ausentes.

**C4 (R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11)** Dado qualquer estado / Quando verifico os cenários dos incrementos 1 e 2 / Então todos os cenários dos incrementos 1 e 2 continuam valendo.

## Fora de escopo
- Alterar inscrições, desistências, vagas ou a fila de espera.
- Alterar o registro de chegada depois de marcado.
- Guardar dados depois que o servidor é desligado.

## Dúvidas resolvidas
| Dúvida | Decisão |
|---|---|
| Marcar a chegada duas vezes é erro? | Não; a pessoa continua presente sem alterar sua situação. |
| Quem aparece como ausente ao fim da oficina? | Pessoas confirmadas sem chegada marcada; a fila de espera não entra na lista de ausentes. |
