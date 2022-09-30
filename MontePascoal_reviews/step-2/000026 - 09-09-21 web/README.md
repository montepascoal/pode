# Instituto Monte Pascoal - 000026

## **Review**
## Data: 09/09/21
## System: web-app

***

> ## Componente: Header
> ## Componente: Principal
> ## Componente: Nav
> ## Componente: Nav User

### Trello
https://trello.com/c/nDphUpXP/165-header-principal  
https://trello.com/c/aa4XNuoW/166-header-nav  
https://trello.com/c/Km2iYL3W/195-header-nav-user  

### Relatório  
Foi feito uma revisão de todo o código para o componente e pagina em questão.  

<!-- O resultado foi que o componente foi **APROVADO** e o mesmo será movido para "Revisão Aprovada* e entrará em produção no proximo deploy.   -->

O resultado foi que a revisão foi **REPROVADA**, sendo necessário alguns ajustes para conclusão.

Segue a lista dos ajustes necessários:

- **COMPONENTE HEADER**
  - Separador está diferente de como está no layout
    - Sugestão: não utilizar o HR, mas sim uma div com background
  - Na resolução 4k está aparecendo uma linha azul no panel branco
  - Colocar o Inicio do navbar (onde possui a volta) dentro do NAVBAR e **NÃO** em outro componente como está (HEADER)
  - Trabalhar as larguras e definir padrões, cada resolução está de um jeito
    - Remover margem do risco entre botões e usuário
    - Adicionar margem nos componentes botões e usuário
    - Padronizar as larguras dos componentes com os botões
      - Largura Container Botões: 160px
      - Largura Container User: 360px
      - Largura Container User: 360px
      - Seta: sempre ficar ao máximo na direita (respeitando a margem)
      - Imagem e usuário: sempre o máximo a esquerda (respeitando a margem)
- **COMPONENTE HEADER NAV USER**
  - Trabalhar no componente
  - Ao clicar no componente HEADER NAV, ele precisa abrir e fechar o menu, e não apenas abrir
  - Adicionar efeito que o menu abre de cima para baixo, até aparecer todas opções
  - Sem borda e sem sombras
  - Texto cinza background branco
  - Hover: texto preto background cinza
  - Diminuir a fonte da que está
  - Desktop: 
    - Ele precisa ser da largura entre o a linha separadora até o final da tela, e iniciar quando o HEADER finaliza
  - Mobile
    - O menu ocupar toda largura da tela