# Instituto Monte Pascoal - 000070

## **Review**
## Data: 21/02/22 
## System: app

***

> ## Módulo: EMPRESA 
> ## Componente: Breadcrumb  

### Trello
https://trello.com/c/rW7jFz8Z/326-sync-empresa  
https://trello.com/c/Yh6POWP6/327-breadcrumb

### Relatório  
Foi feito uma revisão de todo o código para o componente e pagina em questão.  

<!-- O resultado foi que o componente foi **APROVADO** e o mesmo será movido para "Revisão Aprovada* e entrará em produção no proximo deploy.   -->

O resultado foi que a revisão foi **REPROVADA**, sendo necessário alguns ajustes para conclusão.

Segue a lista dos ajustes necessários:

- **Breadcrumb**
  - Em todas as telas, necessário atualizar o Breadcrumb com a rota que o usuário está com base no menu nav
    - Home
    - Home > Cadastros > Unidades
    - Home > Cadastros > Colaboradores
    - Home > Configurações > Localidades
    - Home > Configurações > Empresa
    - ETC
- **Geral**
  - A Empresa pode ser CPF ou CNPJ (MP-001 / MP-002)
    - Necessário validar se é CPF ou CNPJ
      - CPF: verifica se é um cpf valido por meio de funções
      - CNPJ: verifica se é CNPJ válido por meio de função, e depois consulta na api da receita os dados publicos
  - Redes Sociais (necessário todas essas, nessa ordem) (MP-003 / MP-003)
    - Aqui serão colocado links https, seria bom colocarmos um placeholder
    - Website
    - Facebook
    - Instagram
    - TikTok
    - Linkedin
    - Youtube
    - Twitter
    - Other 1
    - Other 2