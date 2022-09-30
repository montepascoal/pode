# Instituto Monte Pascoal - 000046

## **Review**
## Data: 22/11/21
## System: web-app

***

> ## Pagina: Listagem de Empresas 

### Trello
https://trello.com/c/tLIThsRf/210-criar-branch-register-company  
https://trello.com/c/xmtwl4AX/212-pagina-listagem-empresas  

### Relatório  
Foi feito uma revisão de todo o código para o componente e pagina em questão.  

<!-- O resultado foi que o componente foi **APROVADO** e o mesmo será movido para "Revisão Aprovada* e entrará em produção no proximo deploy.   -->

O resultado foi que a revisão foi **REPROVADA**, sendo necessário alguns ajustes para conclusão.

Segue a lista dos ajustes necessários:

- **Geral**
  - Se eu remover o node_modules e remover o yarn.lock, quando baixo novamente as dependência surge um erro (MP-Error-01)  
  - Se eu utilizar o yarn no git, e baixar as dependência o sistema abre, porem quando vou exportar para xls aparece um erro (MP-Error-02)
  - Mesmo erro ao exportar PDF (MP-Error-03)
- **Navbar**
  - A primeira tela é a LISTAGEM, e não visualização
  - Não é Empresa, é Empresas
  - (MP-Error-04)
  - A categoria principal é CADASTROS
    - Sub-categoria: Empresas
- **Tabela**
  - O que significa esse check no St ?
    - Precisamos de legendas para cada tipo de status
  - Botões para exportar apenas com o formato, e um label escrito antes Exportar, e depois a listagem dos botões (MP-Error-06)
- **Responsivo**
  - Aparecer apenas status, Nome e CNPJ (a partir de 768px) (MP-Error-05)