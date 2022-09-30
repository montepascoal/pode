# Instituto Monte Pascoal - 000090

## **Review**
## Data: 30/03/22 
## System: web-app

***

> ## Módulo: Novas atualizações solicitadas (GENERAL)  

### Trello
https://trello.com/c/aVGLY5wF/334-arquivos-visualiza%C3%A7%C3%A3o-e-download  

### Relatório  
Foi feito uma revisão de todo o código para o componente e pagina em questão.  

<!-- O resultado foi que o componente foi **APROVADO** e o mesmo será movido para "Revisão Aprovada* e entrará em produção no proximo deploy.   -->

O resultado foi que a revisão foi **REPROVADA**, sendo necessário alguns ajustes para conclusão.

Segue a lista dos ajustes necessários:

- **COMPANIES**
  - **TAB FILES**
    - **MODO ADICIONAR FILES**
      - [ ] Falha ao adicionar arquivo .odt / .doc / .docx / .ods
            Recebendo erro 400 Invalid Parameters, porem ao adicionar os mesmos arquivos pelo insomnia eles são adicionados com sucesso.