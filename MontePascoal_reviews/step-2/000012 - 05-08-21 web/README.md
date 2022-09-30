# Instituto Monte Pascoal - 000012

## **Review**
## Data: 05/08/21
## System: web-app

***

> ## Components: Checkbox e Alert

### Trello
https://trello.com/c/Y7fpSInj/73-componente-checkbox  
https://trello.com/c/wyolp95D/79-componente-alertas  
https://trello.com/c/w4OYUN9B/122-integrar-react-toastify  

### Relatório  
Foi feito uma revisão de todo o código para o componente e pagina em questão.  

<!-- O resultado foi que o componente foi **APROVADO** e o mesmo será movido para "Revisão Aprovada* e entrará em produção no proximo deploy.   -->

O resultado foi que a revisão foi **REPROVADA**, sendo necessário alguns ajustes para conclusão.

Segue a lista dos ajustes necessários:

- **CHECKBOX**
  - ok
- **Alert**
  - Criar uma única lib para todos os tipos de alertas `Alert`  
  - Criar propriedade `type`  
  - A biblioteca terá três propriedades (type, title, text)
    - type: string obrigatória, somente `success` / `warning` / `error`  
    - title: string, não obrigatório, se não tiver preenchido, deverá ser: `Sucesso` / `Alerta` / `Erro`  
    - text: string, obrigatório
  - Validar se os alertas não tiverem as propriedades obrigatórias, e `NÃO PERMITIR`
    - Pesquisar sobre utilização das proptypes para tal validação  
- **Pagina DEMO**
  - Para os botões ENVIAR, CANCELAR ENVIO, LOGIN (simples e outline) adicionar para cada um um tipo de alerta  
  - Na sessão 05 Alertas/Notificações, Colocar um botão específico para cada tipo de alerta, e com textos do mundo real  