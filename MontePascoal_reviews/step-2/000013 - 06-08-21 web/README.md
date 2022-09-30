# Instituto Monte Pascoal - 000013

## **Review**
## Data: 06/08/21
## System: web-app

***

> ## Biblioteca: Alert

### Trello
https://trello.com/c/wyolp95D/79-componente-alertas  
https://trello.com/c/w4OYUN9B/122-integrar-react-toastify  

### Relatório  
Foi feito uma revisão de todo o código para o componente e pagina em questão.  

<!-- O resultado foi que o componente foi **APROVADO** e o mesmo será movido para "Revisão Aprovada* e entrará em produção no proximo deploy.   -->

O resultado foi que a revisão foi **REPROVADA**, sendo necessário alguns ajustes para conclusão.

Segue a lista dos ajustes necessários:

- **Alert**
  - Alterar `Title` para `title`  
    - Normalmente, letras é utilizado letras maiúsculas apenas para componentes   
  - Pode-se utilizar o `title` vindo da função e alterar o valor caso seja null ou undefined  
  - Caso não seja enviado o `text` é necessário ser criado um erro 
    - `throw new Error({'hehe':'haha'})`
  - Verificar se é realmente retornar o `toast` ou se funcionara sem o return, pois a função quando é chamada não espera retorno  
  - No `switch`, se não for nenhuma das opções de **type** possíveis é necessário gerar um erro
- **Página DEMO**
  - Eu alterei a ordem das chamadas, vamos sempre manter o padrão:
    - Recursos react
    - bibliotecas locais
    - bibliotecas instaladas
    - componentes locais
    - assets (imagens)
    - estilos