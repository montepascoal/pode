# Instituto Monte Pascoal - 000020

## **Review**
## Data: 26/08/21
## System: web-app

***

> ## Página: Auth Login
> ## Página: DEMO

### Trello
https://trello.com/c/xTOhCaEZ/136-p%C3%A1gina-auth-login  
https://trello.com/c/5DnIDi8i/230-testes-pagina-login-e-componentes  
https://trello.com/c/2UG9KByq/232-p%C3%A1gina-error-404  
https://trello.com/c/FvURhuWu/231-p%C3%A1gina-error-500  

### Relatório  
Foi feito uma revisão de todo o código para o componente e pagina em questão.  

<!-- O resultado foi que o componente foi **APROVADO** e o mesmo será movido para "Revisão Aprovada* e entrará em produção no proximo deploy.   -->

O resultado foi que a revisão foi **REPROVADA**, sendo necessário alguns ajustes para conclusão.

Segue a lista dos ajustes necessários:

- **Pagina DEMO**
  - Erro no alinhamento dos inputs em comparação com Select Option (correto input)
  - Erro no espaçamento entre os dois itens do radio, e entre os dois checkbox
  - Erro no responsivo para os inputs (estão grudados)
  - O tamanho dos inputs estão padronizados?
    - Eles precisam ocupar o espaço total da div, e o responsivo controlar o comprimento deles e o espaçamento
- **Pagina Main**
  - ok
- **Página Login**
  - ok
  - **RESPONSIVO**
    - ok desktop
    - ok tablet
    - MOBILE
      - O painel está perdendo o tamanho máximo padrão das demais resoluções
      - O titulo está em uma única linha
- **Pagina Error 404**
  - Adicionar botão para voltar para HOME
- **Pagina Error 500**
  - ok