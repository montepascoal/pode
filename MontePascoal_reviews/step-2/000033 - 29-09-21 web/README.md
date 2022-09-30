# Instituto Monte Pascoal - 000033

## **Review**
## Data: 29/09/21
## System: web-app

***

> ## Componente: Navbar

### Trello
https://trello.com/c/cM5p2BnW/185-navbar  
https://trello.com/c/VKowC7eS/187-navbargroup  
https://trello.com/c/0e2ERSPO/186-navbaritem  

### Relatório  
Foi feito uma revisão de todo o código para o componente e pagina em questão.  

<!-- O resultado foi que o componente foi **APROVADO** e o mesmo será movido para "Revisão Aprovada* e entrará em produção no proximo deploy.   -->

O resultado foi que a revisão foi **REPROVADA**, sendo necessário alguns ajustes para conclusão.

Segue a lista dos ajustes necessários:

- **COMPONENTE NAVBAR**
  - Nos itens do grupo resumido, colocar um **BORDER** na mesma cor do cinza das linhas, porem com 1px 
    - Conforme imagem
  - Remover a linha entre os itens 
    - Conforme imagem
  - **Mobile e tablet**
    - Scroll: o tamanho da div do menu esta o mesmo tamanho da tela do dispositivo, porem não levanto em conta o tamanho do header e breadcrumb, e por isso gerando um scroll desnecessário.
    - O scroll precisa ser apenas dentro do proprio navbar, entre os itens e group, e o menu sempre estar no topo da pagina
      - NÃO USAR POSITION ABSOLUTE
      - Apenas utilizar o layout, definir altura maxima do navbar e suas opções, e adicionar scroll apenas nele