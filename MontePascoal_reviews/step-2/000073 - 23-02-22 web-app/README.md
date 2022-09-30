# Instituto Monte Pascoal - 000073

## **Review**
## Data: 23/02/22 
## System: web-app

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

- **Rotas**
  - As rotas da aplicação cliente precisam ser no idioma pt-br
  - NOVA IMPLEMENTAÇÃO:
    - Vamos alterar a rota para pagina Main
      ```jsx
      <Route path="/" exact component={Main} />
      <Route path="/paginas" exact component={Pages} />
      ```
    - No navbar, adicionar uma entrada para /paginas
    - Depois conferir o breadcrumb se estará tudo ok na rota "/"
- **Breadcrumb**
  - ok
- **Geral**
  - Alterar o titulo Outro para "Outro 1"
  - Ocultar no formulário Outro1 e Outro2 (vamos deixar no sistema, mas sem uso por enquanto)
    - Talvez seria bom continuar enviando sempre o valor "" para o backend