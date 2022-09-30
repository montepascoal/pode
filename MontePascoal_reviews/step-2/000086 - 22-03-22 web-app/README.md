# Instituto Monte Pascoal - 000086

## **Review**
## Data: 23/03/22 
## System: web-app

***

> ## Módulo: Novas atualizações solicitadas (GENERAL)  

### Trello
https://trello.com/c/TJRKw047/330-novas-atualiza%C3%A7%C3%B5es-solicitadas  

### Relatório  
Foi feito uma revisão de todo o código para o componente e pagina em questão.  

<!-- O resultado foi que o componente foi **APROVADO** e o mesmo será movido para "Revisão Aprovada* e entrará em produção no proximo deploy.   -->

O resultado foi que a revisão foi **REPROVADA**, sendo necessário alguns ajustes para conclusão.

Segue a lista dos ajustes necessários:

- **VISUALIZADOR DE ARQUIVOS**
  - Adicionei uma imagem quadrada, porem na visualização ela ficou cortada, e sem nenhuma interação, de zoom, mover, e etc (MP-01)
  - Falha ao abrir xls
  - Não foi possível testar a visualização de documentos word (falha no upload)
  - Adicionar suporte
    - odt
    - ods
- **TABS**
  - Adicionar click com ctrl para abrir nova guia (MP-02/MP-03/MP-04/MP-05)
  - Por exemplo, se eu clicar em Nova unidade (apertando o ctrl) não abre em uma nova guia no crome