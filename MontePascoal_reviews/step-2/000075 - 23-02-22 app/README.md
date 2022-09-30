# Instituto Monte Pascoal - 000075

## **Review**
## Data: 23/02/22 
## System: app

***

> ## Módulo: EMPRESA   
> ## Módulo: UNIDADES   

### Trello
https://trello.com/c/0NgpZHkm/329-ajustes  

### Relatório  
Foi feito uma revisão de todo o código para o componente e pagina em questão.  

<!-- O resultado foi que o componente foi **APROVADO** e o mesmo será movido para "Revisão Aprovada* e entrará em produção no proximo deploy.   -->

O resultado foi que a revisão foi **REPROVADA**, sendo necessário alguns ajustes para conclusão.

Segue a lista dos ajustes necessários:

- **Geral**
  - Está faltando o field comObservations para o backend
  - Alterar `comConMediaWebSite` para `comConMediaWebsite`
  - Atualizar na documentação
  - Em todos os campos que permite NULL, temos uma verificação que não permite '' (se for string)
    - Quando um campo for string e enviado como '', e não for "NOT NULL", vamos transformar ele em null
    - ```js
      if (
          obj.comConMediaLinkedin === undefined ||
          obj.comConMediaLinkedin === null
        ) {
          objData.data.comConMediaLinkedin = null;
        } else {
          if (
            obj.comConMediaLinkedin === '' ||
            typeof obj.comConMediaLinkedin !== 'string'
          ) {
            isValid = false;
          } else {
            objData.data.comConMediaLinkedin = obj.comConMediaLinkedin;
          }
        }
      ```
    - Vamos alterar para 
      ```js
      if (
          obj.comConMediaLinkedin === undefined ||
          obj.comConMediaLinkedin === null ||
          obj.comConMediaLinkedin === ''
        ) {
          objData.data.comConMediaLinkedin = null;
        } else {
          if (
            typeof obj.comConMediaLinkedin !== 'string'
          ) {
            isValid = false;
          } else {
            objData.data.comConMediaLinkedin = obj.comConMediaLinkedin;
          }
        }
      ```
