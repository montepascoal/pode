# Instituto Monte Pascoal - 000032

## **Review**
## Data: 27/09/21
## System: web-app

***

> ## Componente: Navbar

### Trello
https://trello.com/c/4SxKVUVW/181-criar-branch-navbar  
https://trello.com/c/cM5p2BnW/185-navbar  
https://trello.com/c/VKowC7eS/187-navbargroup  
https://trello.com/c/0e2ERSPO/186-navbaritem  

### Relatório  
Foi feito uma revisão de todo o código para o componente e pagina em questão.  

<!-- O resultado foi que o componente foi **APROVADO** e o mesmo será movido para "Revisão Aprovada* e entrará em produção no proximo deploy.   -->

O resultado foi que a revisão foi **REPROVADA**, sendo necessário alguns ajustes para conclusão.

Segue a lista dos ajustes necessários:

- **COMPONENTE NAVBAR**
  - Alinhamento dos itens dentro do grupo (colocar alinhamento do texto a esquerda) (apenas desktop)
  - Nos itens do grupo resumido, colocar uma borda na mesma cor do cinza das linhas, porem com 1px  
  - Retirar o bold dos group, ficará com uma aparência mais clean
  - **Mobile e tablet**
    - Sempre ocupar toda altura disponível
      - Manter os grupos e itens assim como estão, porem abaixo de logout, deixar o espaço em branco no total da tela sempre, para o usuário nao ver nada da pagina nem permitir interação com a página
    - Manter os itens assim como estão, os principais alinhados a esquerda e os itens dos grupos manter centralizado