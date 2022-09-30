# Instituto Monte Pascoal - 000016

## **Review**
## Data: 17/08/21
## System: web-app

***

> ## Sistema: JSON Server

### Trello
https://trello.com/c/eckfb7mJ/146-integrar-json-server  

### Relatório  
Foi feito uma revisão de todo o código para o componente e pagina em questão.  

O resultado foi que o componente foi **APROVADO** e o mesmo será movido para "Revisão Aprovada* e entrará em produção no proximo deploy.  

<!-- O resultado foi que a revisão foi **REPROVADA**, sendo necessário alguns ajustes para conclusão.

Segue a lista dos ajustes necessários:

- **Pagina Main**
  - Adicionar botão para tela de login  
- **Validação CPF**
  - Se eu digitar o CPF 111.111.111-11 aparecerá que o mesmo é valido, porem não válido
  - Necessário corrigir e testar possibilidades
- **Página Login**
  - Função `validateInput`:
    - ```js
      const validateInput = (text) => {
        setValueDocument(mascaraCPF(text));
        setSuccessInput(validaCPF(text) ? true : false);
        setErrorInput(validaCPF(text) ? false : true);
      }
      ```
      ```js
      const validateBlurInput = (text) => {
        if(text.length === 0) {
          setSuccessInput(false);
          setErrorInput(false);
        } else {
          setSuccessInput(validaCPF(text) ? false : false);
          setErrorInput(validaCPF(text) ? false : true);
        }
      }
      ```
      Está sendo executado a mesma função `validaCPF` duas vezes para cada vez que o usuário digita um valor.  
      Alterar para ser executada apenas uma vez para economizar recursos.  
  - Para esse script:
    ```js 
      setSuccessInput(validaCPF(text) ? false : false);
    ```
    Está sendo feito uma verificação de campo, uma verificação de validação do CPF, e independente do resultado está salvando `false` na variável, ou seja, desconsiderando todo processamento feito.  
  - Input CPF
    - Não está sendo enviado o type para o input, é necessário ser "text"  
    - Colocar como default prop o "text"
    - Para o input, está sendo validado erro e sucesso, e armazenado uma informação para cada `state`. Mas sempre um é o oposto do outro, se está com erro, não está com sucesso, se está com sucesso não está com erro.  
  - **RESPONSIVO**
    - Footer com telefones e social medias não estão conforme layout, não estão centralizadas  
    - Adicionar link interativo para telefones
    - Adicionar link interativo para midias sociais  
    - Adicionar link interativo para Logo Monte Pascoal no footer para "/" do sistema   
    - Favor corrigir **responsivo para desktop** da imagem a esquerda, a mesma está sendo **encolhida e esticada**  
    - Adequar ao layout nas resoluções desktop  
    - Adequar proporção do background branco, está bem maior que layout   -->
