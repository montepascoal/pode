# Instituto Monte Pascoal - 000022

## **Review**
## Data: 02/09/21
## System: web-app

***

> ## Página: Main
> ## Página: Test
> ## Componente: Layout
> ## Doc: Changelog

### Trello
https://trello.com/c/QJK5mzpo/158-criar-branch-layout  
https://trello.com/c/4OGrS5hf/159-criar-estrutura-do-layout  
https://trello.com/c/6ZdNu3b8/183-criar-pagina-main  
https://trello.com/c/GeCL4UZL/184-criar-pagina-test  

### Relatório  
Foi feito uma revisão de todo o código para o componente e pagina em questão.  

<!-- O resultado foi que o componente foi **APROVADO** e o mesmo será movido para "Revisão Aprovada* e entrará em produção no proximo deploy.   -->

O resultado foi que a revisão foi **REPROVADA**, sendo necessário alguns ajustes para conclusão.

Segue a lista dos ajustes necessários:

- **CHANGELOG**
  - A estrutura está correta, porem necessário apenas um ajuste:
    - A ordem do das versões é da mais recente para a mais antiga.
    - Ex: 0.1.1 -> 0.1.0 -> 0.0.5 -> 0.0.2
  - Sempre que atualizar uma versão, é necessário atualizar a **version** no package
  - Para o proximo branch eu vou adicionando a versão no trello quando for necessário alterar
  - Para esses ajustes, vamos utilizar uma nova versão 0.1.6
- **Pagina Pages**
  - Adicionar as Páginas Main e Test
- **Pagina Test**
  - ok
- **Pagina Main**
  - ok
- **Componente Layout**
  - Header ok
  - Breadcrumb ok
  - Nav
    - Colocar largura fixa em 45px sempre, e não em 3%