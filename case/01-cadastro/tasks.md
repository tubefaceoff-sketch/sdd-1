# Tarefas 01 — Cadastro e listagem

- [x] **T1** (R3) Criar o array em memória de inscritos com `name` e `email` — verificar: array inicia vazio.
- [x] **T2** (R3) Implementar `GET /participants` retornando os inscritos em ordem — verificar: consulta vazia retorna `[]`.
- [x] **T3** (R1) Implementar `POST /participants` rejeitando nome inválido ou e-mail vazio com status 400 e a mensagem definida no plano — verificar: nome vazio, `"A"` e e-mail vazio são recusados.
- [x] **T4** (R2) Normalizar o e-mail antes de armazená-lo — verificar: `" BIA@Mail.com "` retorna como `bia@mail.com`.
- [x] **T5** (R2, R4) Rejeitar e-mail já cadastrado com status 409 e `"E-mail já cadastrado"`, sem alterar a lista — verificar: tentar `" Ana@Mail.com "` após cadastrar `ana@mail.com`.
- [x] **T6** (R1, R3) Adicionar cadastro válido ao array e responder com o inscrito criado — verificar: cadastrar Ana retorna seu nome e e-mail.
- [x] **T7** (R1) Criar na tela o formulário para enviar nome e e-mail — verificar: os dois campos podem ser preenchidos e enviados.
- [x] **T8** (R3) Exibir a lista recebida da API em ordem de cadastro — verificar: lista vazia e cadastro de Ana seguido por Bia.
- [x] **T9** (R4) Exibir erros da API sem alterar a lista na tela — verificar: cadastro inválido ou repetido mostra a mensagem correspondente e mantém a lista.
- [x] **T10** (todas) Rodar todos os cenários de aceite da spec — verificar: manualmente na tela e, no P5, `npm test` com `fail 0`.
