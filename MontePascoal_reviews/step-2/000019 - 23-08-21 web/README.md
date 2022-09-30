# Instituto Monte Pascoal - 000019

## **Review**
## Data: 23/08/21
## System: web-app

***

> ## Página: Auth Login
> ## Página: DEMO

### Trello
https://trello.com/c/zdCc8bBq/154-login-codificar-check-salvar-cpf  
https://trello.com/c/PkPLxtR6/150-codificar-login  
https://trello.com/c/xTOhCaEZ/136-p%C3%A1gina-auth-login  


### Relatório  
Foi feito uma revisão de todo o código para o componente e pagina em questão.  

<!-- O resultado foi que o componente foi **APROVADO** e o mesmo será movido para "Revisão Aprovada* e entrará em produção no proximo deploy.   -->

O resultado foi que a revisão foi **REPROVADA**, sendo necessário alguns ajustes para conclusão.

Segue a lista dos ajustes necessários:

- **Pagina DEMO**
  - Adicionar label aos links  
  - Para o responsivo, os input text e option select não estão padronizados
    - O correto é assim como os Option Select (centralizado e tamanho total)
  - Colocar radio e check centralizados assim como restante dos componentes  
- **Pagina Main**
  - ok
- **Salvar CPF**
  - ok
- **Página Login**
  - Utilizar syntax async await, e validar erros com try catch  
    - Atualmente está assim:
      ```js
      const handleInfoSystem = async () => {
        await api
        .get("/system")
        .then((response) => {
          setInfoSystem(response.data);
        })
        .catch((err) => {
          history.push('/error500');
          console.error('ERROR API [GET] /system: ' + err)
        });
      }
      ```
  - Mesmo com o CPF inválido, está sendo possível clicar para entrar
    - É necessário validar os campos, tanto se estão preenchidos como são válidos
  - **RESPONSIVO**
    - ok desktop
    - ok tablet
    - MOBILE
      - Trabalhar e variar a margem conforme layout, se não fica muito desproporcional a largura do panel branco com a imagem e margens  
      - Adicionar margens para altura entre telefone e social
- **Observações**
  - Fiz alguns ajustes de links e arquivos
    - Estamos utilizando o link json-server online
    - Localmente pode-se utilizar o localhost
  - O ideal é criar ambientes dev e prod, deixar default como produção (arquivo env), os parametros assim como está, e dev utilizando variaveis para dev