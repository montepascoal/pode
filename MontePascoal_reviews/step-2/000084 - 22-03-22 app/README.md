# Instituto Monte Pascoal - 000083

## **Review**
## Data: 22/03/22 
## System: app

***

> ## Módulo: USUÁRIOS (USERS)   

### Trello
https://trello.com/c/4XItImOB/314-usuarios  

### Relatório  
Foi feito uma revisão de todo o código para o componente e pagina em questão.  

<!-- O resultado foi que o componente foi **APROVADO** e o mesmo será movido para "Revisão Aprovada* e entrará em produção no proximo deploy.   -->

O resultado foi que a revisão foi **REPROVADA**, sendo necessário alguns ajustes para conclusão.

Segue a lista dos ajustes necessários:

- **DOCUMENTAÇÃO**
  - Atualizar ordem das entidades no insomnia, USERS por último (sempre a mais recente por baixo)
  - Login: A senha foi atualizada no seed mas não atualizada no insomnia
- **SEED**
  - Todos os lugares que tiver algo relacionado a *facilite*, alterar para *pode*
- **USERS**
  - Tem um usuário (id=10), mas não tem um employee correspondente para ele
  - Revisar os seeders, por exemplo, cada usuário precisa ter algum dado de referência válido
    - Se for do tipo Employees, precisa ter um com o codigo referenciado, o mesmo para Client e Partner
  - **CREATE**
    - O *useKeyCompany* é o codigo da unidade que ele tem permissão, sempre que um employee for cadastrado, nós enviamos o codigo da unidade que ele pertence
      - Quando vamos criar o usuário, esse usuário terá sempre duas opções
        - A permissão apenas para unidade que foi registrado
          - useKeyCompany = id da companie que o EMPLOYEE esta registrado
        - B permissão para todas unidades
          - useKeyCompany = 0
      - Mas o employee continua com seu comId normalmente, pois quem acessa o sistema não é o employee, mas sim o usuário
    - Cada origem de usuário (EMPLOYEE, PARTERS, ETC) pode posuir apenas um usuário
      - Nos testes, eu consegui criar dois usuários para o mesmo employee
    - Mensagem informativa em portugues
      - (MP-error-01)
  - **UPDATE**
    - Está permitindo nickname identicos para varios usuarios
  - **RESET PASSWORD** 
    - Confere o fluxo de reset de senhas
      - Primeiro solicita o reset de senha (pode ser feito pelo usuário)
      - Usuário recebe uma senha temporaria por email
      - Usuário obrigado atualizar a senha
      - Usuário cria nova senha