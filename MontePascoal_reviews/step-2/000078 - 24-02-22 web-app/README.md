# Instituto Monte Pascoal - 000078

## **Review**
## Data: 24/02/22 
## System: web-app

***

> ## Módulo: EMPRESA (COMPANIES-MAIN)   
> ## Módulo: UNIDADES (COMPANIES)     

### Trello
https://trello.com/c/ic9G4Prb/301-unidades  

### Relatório  
Foi feito uma revisão de todo o código para o componente e pagina em questão.  

<!-- O resultado foi que o componente foi **APROVADO** e o mesmo será movido para "Revisão Aprovada* e entrará em produção no proximo deploy.   -->

O resultado foi que a revisão foi **REPROVADA**, sendo necessário alguns ajustes para conclusão.

Segue a lista dos ajustes necessários:

- **ROTAS**
  - REVIEW-000073 (não foi implementado)
    - Vamos alterar a rota para pagina Main
      ```jsx
      <Route path="/" exact component={Main} />
      <Route path="/paginas" exact component={Pages} />
      ```
    - No navbar, adicionar uma entrada para /paginas
    - Depois conferir o breadcrumb se estará tudo ok na rota "/"
- **UNIDADES**
  - **Listagem**
    - Conferir CNPJ para CNPJ/CPF e as mascadas corretas (MP-03)