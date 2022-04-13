# FrontEnd

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

## Development server

Executar `ng serve` para um servidor de desenvolvimento. Navegue até `http://localhost:4200/`. O aplicativo será recarregado automaticamente se você alterar qualquer um dos arquivos fonte.

## Code scaffolding

Executar `ng generate component component-name` para gerar um novo componente. Você também pode utilizar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Executar `ng build` para construir o projeto. Os artefatos de construção serão armazenados no diretório `dist/`.

## Running unit tests

Executar `ng test` para executar os testes unitários via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Executar `ng e2e` para executar os testes de ponta a ponta através de uma plataforma de sua escolha. Para utilizar este comando, você precisa primeiro adicionar um pacote que implemente as capacidades de teste de ponta a ponta.

## Cadastrar usuário de acesso

Identity:
- AspNetUsers: Dados usuário cadastrado no banco de dados.
- AspNetUsers: Pegar token no `AspNetUsers` do usuário cadastrado para liberar as permissões.
  - UserID: Colar token do usuário cadastrado contido no `AspNetUsers`.
  - ClaimType: Informar as Controllers `Restaurante e Receita`, para obter permissões.
  - ClaimValue: Adicionar permissões de `Adicionar,Atualizar,Excluir`.

## Usuário já cadastrado e com permissões
- Login: masterchef@teste.com
- Senha: Master@123
