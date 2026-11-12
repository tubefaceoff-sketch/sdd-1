# Spec 01 — Cadastro e listagem

## Objetivo
O organizador cadastra quem vai participar da oficina informando nome e e-mail, e vê a lista de inscritos.
Ninguém pode ser cadastrado duas vezes, para que a contagem de pessoas seja confiável.

## Regras de negócio
- **R1** Nome e e-mail são obrigatórios. O nome precisa ter pelo menos 2 caracteres depois de remover espaços nas pontas.
- **R2** O e-mail é único. A comparação ignora maiúsculas/minúsculas e espaços nas pontas. O e-mail é guardado normalizado: minúsculas, sem espaços nas pontas.
- **R3** A lista mostra os inscritos na ordem em que foram cadastrados, com nome e e-mail.
- **R4** Um cadastro inválido ou repetido mostra uma mensagem de erro na tela e não altera a lista.

## Cenários de aceite
**C1 (R3)** Dado que ninguém foi cadastrado / Quando abro a lista / Então ela está vazia.

**C2 (R1, R3)** Dado que a lista está vazia / Quando cadastro "Ana Lima" com "ana@mail.com" / Então a lista mostra "Ana Lima — ana@mail.com".

**C3 (R2, R4)** Dado que "ana@mail.com" já está cadastrada / Quando cadastro "Ana L." com " Ana@Mail.com " / Então o cadastro é recusado com a mensagem "E-mail já cadastrado" e a lista continua com uma pessoa.

**C4 (R1, R4)** Dado qualquer estado / Quando cadastro com nome "" ou "A" / Então o cadastro é recusado com a mensagem "Nome e e-mail são obrigatórios" e a lista não muda.

**C5 (R2)** Dado a lista vazia / Quando cadastro "Bia" com " BIA@Mail.com " / Então a lista mostra o e-mail como "bia@mail.com".

**C6 (R3)** Dado que cadastrei Ana e depois Bia / Quando abro a lista / Então Ana aparece antes de Bia.

## Fora de escopo
- Editar ou remover inscritos.
- Limite de vagas, fila de espera, check-in (incrementos 2 e 3).
- Guardar os dados depois que o servidor é desligado.
- Validar se o e-mail "existe" ou tem formato perfeito; basta não ser vazio.

## Dúvidas resolvidas
| Dúvida | Decisão |
|---|---|
| O que é "gente repetida"? | Mesmo e-mail, ignorando caixa e espaços nas pontas. Nome igual não é repetição. |
| O e-mail aparece como foi digitado? | Não. Aparece normalizado (minúsculas, sem espaços nas pontas). |
