# Instituto Monte Pascoal - 000063

## **Review**
## Data: 07/02/22 
## System: web-app

***

> ## Módulo: CONFIG 
> ## Módulo: CONFIG - EMPRESA

### Trello
https://trello.com/c/Ge5LAOKO/291-in%C3%ADcio-do-m%C3%B3dulo  
https://trello.com/c/uaDVv45f/293-empresas  

### Relatório  
Foi feito uma revisão de todo o código para o componente e pagina em questão.  

<!-- O resultado foi que o componente foi **APROVADO** e o mesmo será movido para "Revisão Aprovada* e entrará em produção no proximo deploy.   -->

O resultado foi que a revisão foi **REPROVADA**, sendo necessário alguns ajustes para conclusão.

Segue a lista dos ajustes necessários:

- **Visualização/Edição**
  - Bloquear campo pais, sempre será Brasil
  - Seria bom buscar todos os estados e todas cidades do backend, e montar um array na tela
    - Apenas após ter esses dados liberar a tela para o usuário
    - Com esse array, personalizar para usuário conforme ele seleciona o estado, listar apenas cidades desse estado
    - No retorno das cidades e estados, possui os id de referencia, então uma agregação simples ja vai resolver