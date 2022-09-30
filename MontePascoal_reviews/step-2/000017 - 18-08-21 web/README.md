# Instituto Monte Pascoal - 000017

## **Review**
## Data: 18/08/21
## System: web-app

***

> ## Página: Login
> ## Componente: Input Validado

### Trello
https://trello.com/c/xTOhCaEZ/136-p%C3%A1gina-auth-login    
https://trello.com/c/CamxCiSF/151-login-mascara-e-input-validado  

### Relatório  
Foi feito uma revisão de todo o código para o componente e pagina em questão.  

O resultado foi que o componente foi **APROVADO** e o mesmo será movido para "Revisão Aprovada* e entrará em produção no proximo deploy.  

<!-- O resultado foi que a revisão foi **REPROVADA**, sendo necessário alguns ajustes para conclusão.

Segue a lista dos ajustes necessários:

- **Pagina Main**
  - ok
- **Validação CPF**
  - ok
- **Página Login**
  - Função `validateInput`:
    - ```js
        setSuccessInput(validateCPF ? true : false);
      ```
      Se o validateCPF for true ou false, não é necessário fazer a verificação, apenas utilizar o valor da variável  
      ```js
        setErrorInput(validateCPF ? false : true);
      ```
      Aqui está sendo feito uma verificação do valor, e é utilizado o inverso, uma sugestão é utilizar a **negação**  
      Ex: setErrorInput(!validateCPF);
  - Para esse script:
    ```js 
      setSuccessInput(validateCPF ? false : false);
    ```
    Está sendo feito uma verificação de campo, uma verificação de validação do CPF, e independente do resultado está salvando `false` na variável, ou seja, desconsiderando todo processamento feito.  
  - **RESPONSIVO**
    - ok desktop -->
