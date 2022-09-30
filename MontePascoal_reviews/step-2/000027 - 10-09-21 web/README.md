# Instituto Monte Pascoal - 000027

## **Review**
## Data: 10/09/21
## System: web-app

***

> ## Page: Logout
> ## Componente: Principal
> ## Componente: Nav
> ## Componente: Nav User

### Trello
https://trello.com/c/eBCi6SLT/173-criar-pagina-logout  
https://trello.com/c/aa4XNuoW/166-header-nav  
https://trello.com/c/Km2iYL3W/195-header-nav-user  

### Relatório  
Foi feito uma revisão de todo o código para o componente e pagina em questão.  

<!-- O resultado foi que o componente foi **APROVADO** e o mesmo será movido para "Revisão Aprovada* e entrará em produção no proximo deploy.   -->

O resultado foi que a revisão foi **REPROVADA**, sendo necessário alguns ajustes para conclusão.

Segue a lista dos ajustes necessários:

- **PAGINA LOGOUT**
  - ok
- **PAGINA PAGES**
  - Adicionar botão para página de logout
- **COMPONENTE HEADER**
  - Manter os botões do menu até o tablet, apenas para mobile remover.
    - Trabalhar o responsivo assim como está no momento para que o conteúdo apareça
- **COMPONENTE HEADER NAV**
  - O componente com o nome do usuário possui todo o espaço disponível para escrever o nome
    - Em algumas resoluções, mesmo possuindo o espaço, está resumindo o nome e adicionando ...
    - Em anexo exemplos
- **COMPONENTE HEADER NAV USER**
  - A Animação é exatamente essa, parabéns!
  - Ficou muito apagado o menu.
    - Utilizar as cores do layout (pagina DEMO)
    - Texto: #545454
    - Ícone: #545454
    - Border: #dcdcdc
    - Hover: 
      - Background: #DCDCDC36
      - Text: #000;
  - Segue vídeo com demonstração

### **Obs**.:
Desktop: 1024px para cima  
Tablet: 768px até 1023px  
Mobile: 0 até 767px  
