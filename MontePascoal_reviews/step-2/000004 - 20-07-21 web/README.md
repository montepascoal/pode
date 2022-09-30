# Instituto Monte Pascoal - 000004

## **Review**
## Data: 20/07/21
## System: web-app

***

> ## Componente: Input 

### Trello
https://trello.com/c/CIYBIqKn/70-componente-input 

### Relatório  
Foi feito uma revisão de todo o código para o componente em questão.  
<!-- O resultado foi que o componente foi **APROVADO** e o mesmo será movido para "Revisão Aprovada* e entrará em produção no proximo deploy.   -->

O resultado foi que o componente foi **REPROVADO**, sendo necessário alguns ajustes para conclusão.

Segue a lista dos ajustes necessários:

- É importante OLHAR o layout e seguir o componente conforme aparece no arquivo !!!!!!!
- FUNCIONAMENTO
  - Quando estiver digitando, e o focus estiver habilitado, o TEXTO no layout é PRETO!
  - Quando sair do componente (parar de digitar e tirar o foco) o texto é preto.
  - Confere as margins e padding, quando o componente recebe o foco, está deslocando outros elementos.
- CÓDIGO
  - Se a pagina enviar sucesso e erro para o componente ao mesmo tempo, é apresentado os dois icones. O sistema **NÃO** pode **permitir** isso.  
  - No componente `S.Input` está sendo enviado `isEmpty` como FUNÇÃO para o arquivo de estilos, sendo o valor isEmpty precisa ser `boolean`. Atualmente, a cada digito que o usuário clicar no teclado, é executado pelo menos 4 vezes em background a mesma função SEM NECESSIDADE. E isso porque estamos começando as validações, quanto mais validaçoes, mais vezes ela será executada.
    - Correção: não envie a função para ser executada, envie boolean.  
  - Para `S.IconSuccess` e `S.IconError` está sendo enviado integer no lugar de boolean.
    - O componente recebe um boolean
    - Está sendo feito uma validação if else
    - Está convertendo e enviado para o styles integer
    - O styles recebe o integer, converte para boolean
    - Depois faz uma validação com boolean para exibir o resultado
    - CORREÇÃO: envie boolean, que diminui varias conversões desnecessárias
