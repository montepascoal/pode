# Instituto Monte Pascoal

## **Relatório** 05/07/21

***

> ## WEB APP 

Está sendo realizado uma verificação de todo o código desenvolvido até o momento, e será necessário as seguintes alterações:

- Foi desabilitado o **LIVE RELOAD** do projeto, não é interessante para desenvolvimento e produção. O código precisa ser único, para todos os sistemas, tanto para desenvolvimento e produção. Favor habilitar novamente.
- O titulo da página web está com erro, está digitado "Monte Pacoal".
- Pasta **src/assets**, colocar a `cover.jpg` dentro de `src\assets\images`.
- Estilos globais 
  - Criar as cores:
    - `primary` - cor principal do sistema
    - `secondary` - #FFFFFF
    - `hover` - cor principal do sistema para hover
  - Remover esses estilos: (margin será personalizados conforme o layout) 
    - ```css
      h1, h2, h3, h4, h5, h6 {
        ...
        margin-top: 5px;
        margin-bottom: 5px;
      }
      ```
  - Remover esses estilos: (margin será personalizados conforme o layout) 
    - ```css
      p, span, label {
        margin: 5px;
      }
      ```
- Componentes
  - **Button**
    - Remover propriedade `variant`
    - Desestruturar propriedades na declaração da função
    - Alterar propriedade `value` para `text`
    - Alterar defaultProps `text`para "[undefined]"
    - Adicionar propriedade `action`, e validar como tipo para `function`
    - Criar defaultProps para `action` criando uma função que executa um console.log() imprimindo o `text` do button
    - Caso a propriedade `action` seja repassada pelo sistema, deve executar a função na propriedade.
    - Styles:
      - Desestruturar propriedades
      - Corrigir: `background: var(--${props => props.variant})`  
        As propriedades são utilizadas como um todo,  
        `background: ${{variant} => var(--variant})`
      - Remover variável `colorsHovers` e utilizar variável global
    - Verificar e executar teste para ver se está funcionando corretamente
  - **ButtonOutline**
    - Remover propriedade `variant`
    - Desestruturar propriedades na declaração da função
    - Alterar propriedade `value` para `text`
    - Alterar defaultProps `text`para "[undefined]"
    - Adicionar propriedade `action`, e validar como tipo para `function`
    - Criar defaultProps para `action` criando uma função que executa um console.log() imprimindo o `text` do button
    - Caso a propriedade `action` seja repassada pelo sistema, deve executar a função na propriedade.
    - Styles:
      - Desestruturar propriedades
      - Corrigir: `background: var(--${props => props.variant})`  
        As propriedades são utilizadas como um todo,  
        `background: ${{variant} => var(--variant})`
      - Remover variável `colorsHovers` e utilizar variável global
    - Verificar e executar teste para ver se está funcionando corretamente
  - **Link**
    - **NÃO** utilizar `ancora`, utilizar o componente `Link` do `React Router`
    - Remover propriedade `variant`
    - Desestruturar propriedades na declaração da função
    - Alterar propriedade `value` para `text`
    - Alterar defaultProps `text`para "[undefined]"
    - Adicionar propriedade `link`, e validar como tipo para `string`
    - Criar defaultProps para `link` com a string `#`
    - Caso a propriedade `link` seja repassada pelo sistema, deve ser redirecionado para o link enviado.
    - Se o link for link externo (https ou https) deve ser aberto com target `_blank`
    - Styles:
      - Desestruturar propriedades
      - Corrigir: `background: var(--${props => props.variant})`  
        As propriedades são utilizadas como um todo,  
        `background: ${{variant} => var(--variant})`
      - Remover variável `colorsHovers` e utilizar variável global
    - Verificar e executar teste para ver se está funcionando corretamente
  - **Input**
    - Remover propriedade `variant`
    - Codificar igual o `layout`, colocar o label em cima dos input (para **todos**)
    - Desestruturar propriedades na declaração da função
    - Alterar propriedade `value` para `text`
    - Alterar defaultProps `text`para "[undefined]"
    - Criar um `placeholder` default, com: "Digite um valor para [text]" 
    - Estilizar conforme **layout**, se tiver texto ou se não tiver texto (input default e input entered)
    - Estilizar conforme **layout**, se o input está em `foco` ou não
    - Estilizar input se propriedade `disabled` for `true`
      - Estilizar similar ao input default
      - Colocar background #efefef
      - Colocar color #dcdde0
    - Criar propriedade `success`
      - Validar como boolean
      - Default false
      - Estilizar conforme layout se propriedade for `success`
    - Criar propriedade `error`
      - Validar como boolean
      - Default false
      - Estilizar conforme layout se propriedade for `error` 
    - Styles:
      - Desestruturar propriedades
      - Corrigir: `background: var(--${props => props.variant})`  
        As propriedades são utilizadas como um todo,  
        `background: ${{variant} => var(--variant})`
    - Verificar e executar teste para ver se está funcionando corretamente
  - **OptionSelect**
    - **NÃO** encontrei o componente criado no código
    - Necessário componente e estar estilizado assim como no `layout`
    - Verificar e executar teste para ver se está funcionando corretamente
- **Icones**
  - Não foi encontrado na pagina `DEMO` os icones conforme o layout
- Paginas
  - **DEMO**
    - "Reproduzir" o `layout` na pagina, disposição dos itens e demais estilizações
    - Corrigir responsivo da pagina
- GERAL
  - Erro ao gerar teste de cobertura
    - `yarn coverage`