# Briefing do cliente — "Inscrições da Oficina"

> Este é o pedido como o cliente fez. Ele é curto e deixa coisas em aberto **de propósito**.
> O seu trabalho no SDD é transformar cada pedido numa spec sem ambiguidade antes de gerar código.

## Contexto
Organizo uma oficina com vagas limitadas. Hoje controlo as inscrições numa planilha e vive dando problema.
Quero um sistema simples, que rode no meu computador, com uma tela e uma API.

## Incremento 1 — Cadastro
"Quero cadastrar quem vai na oficina, com nome e e-mail, e ver a lista de quem já se inscreveu.
Não pode ter gente repetida."

## Incremento 2 — Vagas
"A sala tem poucas vagas. Quem passar do limite fica numa fila de espera.
Se alguém desistir, o próximo da fila entra no lugar."

## Incremento 3 — Check-in
"No dia da oficina, quero marcar quem chegou e, no fim, ver quem faltou."

## O que o cliente NÃO disse (e a spec precisa decidir)
- O que é "gente repetida"?
- O que acontece se quem desiste estava na fila de espera, e não entre os confirmados?
- Marcar a chegada duas vezes é um erro ou não faz diferença?
