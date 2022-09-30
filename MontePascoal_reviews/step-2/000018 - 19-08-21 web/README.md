# Instituto Monte Pascoal - 000018

## **Review**
## Data: 19/08/21
## System: web-app

***

> ## Página: Auth Login
> ## Página: DEMO
> ## Componente: Link

### Trello
https://trello.com/c/xTOhCaEZ/136-p%C3%A1gina-auth-login  
https://trello.com/c/lC7m4ZCb/147-integrar-axios  
https://trello.com/c/24RaGgKg/148-carregar-informa%C3%A7%C3%B5es-sistema-por-api  
https://trello.com/c/TNojI8Pk/152-remover-arquivo-config-local-clientjs  
https://trello.com/c/zdCc8bBq/154-login-codificar-check-salvar-cpf  
https://trello.com/c/PkPLxtR6/150-codificar-login  


### Relatório  
Foi feito uma revisão de todo o código para o componente e pagina em questão.  

<!-- O resultado foi que o componente foi **APROVADO** e o mesmo será movido para "Revisão Aprovada* e entrará em produção no proximo deploy.   -->

O resultado foi que a revisão foi **REPROVADA**, sendo necessário alguns ajustes para conclusão.

Segue a lista dos ajustes necessários:

- **Pagina DEMO**
  - Após todos os ajustes nos componentes no decorrer do dev da página login, o layout da DEMO foi quebrado
  - Corrigir página DEMO conforme layout e codificado anteriormente
  - Desktop e responsivo
  - Após isso, criar um test snapshot da página
- **Pagina Main**
  - ok
- **Componente Link**
  - Corrigir propriedade children
  NÃO:
  ```jsx
    <Link 
      link={`tel:+55${infoSystem?.phone_1}`}
      children={
        <S.ContainerPhone>
          ...
        </S.ContainerPhone>
      }
    />
  ``` 
  A propriedade children, ja é nativa em todo HTML padrão  
  Da uma pesquisada o que é, como validar e utilizar  
  Atualmente está sendo sobreescrito uma função nativa necessária do HTML, e assim perdendo os atributos padrão de um componente  
- **Salvar CPF**
  - Utilizar as propriedades do localStorage:
    - getItem()
    - setItem()
    - removeItem()
  - Alterar chave para: *@pode/cpfSave*
  - Se a opção para salvar senha for desmarcada APÓS o login, deverá remover o CPF salvo
    - SOMENTE APOS O CLICK DO LOGIN
    - O mesmo para a verificação se o check está marcado para salvar  
- **Página Login**
  - Verificar se o usuário preencheu cpf e senha, se não, não enviar para servidor o login, primeiro ele precisa preencher os dados
  - Colocar todos useEffects no inicio, bem após a declaração dos states  
    - Ordenar primeiro os sem dependências, e depois os com dependências
  - Corrigir erro em dependências do useEffect, o erro aparece no console.log e tambem no proprio editor de texto, inclusive é escrito o que precisa de fazer para corrigir 
  - States:
    - O ideal é declarar cada um isolado, e não uma cadeia de declarações, diminui MUITO a chance de erros
    - O useStates é uma função assincrona, então não é interessante colocar outra requisição assincrona na declaração da mesma:
      ```js
        const [valueDocument, setValueDocument] = useState(
          localStorage.getItem('@pode-username') ?? ''
        );
      ```
      Alterar para:
      ```js
        const [valueDocument, setValueDocument] = useState('');
      ```
      E utilizar o useEffect() para fazer a verificação se possui cpf salvo ou não no navegador.
  - Utilizar **async e await** nas requisições pelo axios
  - Utilizar **try catch** em todas requisições, e exibir alertas de sucesso e erros
    - Não apenas console, o usuário não irá visulizar o console.log 
    - Alerta: erro para usuário ler
    - Console: erro para dev depurar
  - Icone do Facebook está diferente do layout, a borda, e por isso está menor visualmente
  - Está FALTANDO as três bolinhas brancas em todos os layouts
  - **RESPONSIVO**
    - ok desktop
    - ok tablet
    - MOBILE
      - Erro nos links
      - Margem nas laterais diferente do layout
      - Lembrando que vamos validar TODOS os pixels até o Galaxy S5, não em pontos específicos, mas todos

- **NOVAS SOLICITAÇÕES**:
  - Integrar CryptoJs
  - Salvar CPF no localstorage em hash
  - Nova pagina Error 500
  - Se a requisição /system estiver com erro por falta de conexão com o backend, enviar para página Error 500
  - Se a pagina não for encontrada, ir para página 404