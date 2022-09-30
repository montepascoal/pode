# Instituto Monte Pascoal - 000065

## **Review**
## Data: 14/02/22 
## System: web-app

***

> ## Módulo: CONFIG 
> ## Módulo: CONFIG - EMPRESA

### Trello
https://trello.com/c/uaDVv45f/293-empresas  

### Relatório  
Foi feito uma revisão de todo o código para o componente e pagina em questão.  

<!-- O resultado foi que o componente foi **APROVADO** e o mesmo será movido para "Revisão Aprovada* e entrará em produção no proximo deploy.   -->

O resultado foi que a revisão foi **REPROVADA**, sendo necessário alguns ajustes para conclusão.

Segue a lista dos ajustes necessários:

- **Visualização**
  - Enquanto o estado/cidade estão sendo carregados, permite clicar para atualizar, mas ao mesmo tempo fica travado a tela e depois acontece tudo junto
- **Edição**
  - Se alterar o estado, algumas vezes não altera cidade, ou mantem a cidade selecionada anteriormente correspondente a outro estado
    - Necessário limpar a cidade escolhida ao alterar o estado