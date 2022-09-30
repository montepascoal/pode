# Instituto Monte Pascoal - 000006

## **Review**
## Data: 27/07/21
## System: web-app

***

> ## Page: DEMO  
> ## Components: Button, ButtonOutline, Link, Input  

### Trello
https://trello.com/c/Z0erO6po/125-page-demo  

### Relatório  
Foi feito uma revisão de todo o código para o componente em questão.  
Durante a revisão, foram feitos alguns ajustes no componente e página para finalizar o componente.  

<!-- O resultado foi que o componente foi **APROVADO** e o mesmo será movido para "Revisão Aprovada* e entrará em produção no proximo deploy.   -->

O resultado foi que o componente foi **REPROVADO**, sendo necessário alguns ajustes para conclusão.

Segue a lista dos ajustes necessários:

- PAGINA DEMO
  - RESPONSIVO
    - Corrigir **todo** o **responsivo** da Pagina DEMO
  - Corrigir favico (o atual possui background branco e não transparente)
  - Nos inputs de exemplo, está com o evento `onChange={(e) => { return true; }}`
    - Favor retirar esse onChange, aqueles input não possuem interação com usuário, então um evento assim apenas consome recurso e processamento
  - Para o input de teste, no input VALIDADO:
    - Colocar: `onChange={(e) => { setValueValidate(e.target.value) }}`
      - O evento onChange apenas atualiza o status do componente
    - Utilizar o hook `useEffect` para fazer as demais validações
      - Esse hook tem por objetivo gerência ação e efeitos
    - A função **validateBlurInput** tem por objetivo definir cores do input, ou sejá, ela o **COMPONENTE** que possui essa responsabilidade, e não a página
      - É necessário esse tipo de validação estar no componente
      - Caso contrario, cada vez que for utilizar esse componente, precisará criar a mesma função para cada input dentro da pagina, sendo que a pagina não é responsável por funcionalidades do componente
    - Todas validações precisam ser feitas no `useEffect()` e pela função `validateInput()` (e ela não precisa receber parâmetros) 
- COMPONENTE BUTTON
  - O componente está recebendo a propriedade `color`, porem a mesma não está sendo validada pela propTypes.
    - Para default, colocar 'primary'
  - Não é necessário: 
    ```js
      ${({color}) => {
        if (color === 'red') {
          return `
            background: var(--red);

            &:hover {
              background: var(--red-hover);
            }
          `
        } else if (color === 'blue') {
          return `
            background: var(--blue);
            
            &:hover {
              background: var(--blue-hover);
            }
          `
        }
    }}
    ```
    Parar as cores, com a prop validada, precisa apenas na estilização principal do componente carregar a propriedade e colocar a cor e o hover específico
    Eu adicionei no estilo global o `primary-hover`, assim poderá utilizar essa estrutura
- COMPONENTE BUTTON
  - **Mesma coisa que Button**
- COMPONENTE LINK
  - **Mesma coisa que Button**
- COMPONENTE INPUT
  - Retirar validação de conteúdo vazio que está na página, e colocar no componente
    - O componente já possui até a função `isEmpty()`
  - Verificar os testes, estão com erros
- 