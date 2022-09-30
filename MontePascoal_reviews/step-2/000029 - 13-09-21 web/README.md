# Instituto Monte Pascoal - 000029

## **Review**
## Data: 13/09/21
## System: web-app

***

> ## Componente: Breadcrumb

### Trello
https://trello.com/c/7T38VRin/174-breadcrumb  
https://trello.com/c/fEYpf5mK/172-criar-branch-breadcrumb  

### Relatório  
Foi feito uma revisão de todo o código para o componente e pagina em questão.  

<!-- O resultado foi que o componente foi **APROVADO** e o mesmo será movido para "Revisão Aprovada* e entrará em produção no proximo deploy.   -->

O resultado foi que a revisão foi **REPROVADA**, sendo necessário alguns ajustes para conclusão.

Segue a lista dos ajustes necessários:

- **COMPONENTE BREADCRUMB**
  - O icone não pode ser clicável, apenas o texto com a rota pode ser clicável
  - Responsivo:
    - O conteúdo está sendo ocultado conforme vídeo
      - Quando não couber a rota total, vamos sempre manter o HOME e ir removendo a esquerda
      - Nunca permitir scroll