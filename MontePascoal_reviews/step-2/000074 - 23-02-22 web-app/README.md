# Instituto Monte Pascoal - 000074

## **Review**
## Data: 23/02/22 
## System: web-app

***

> ## Módulo: UNIDADES 

### Trello
https://trello.com/c/jiUp1BCK/300-in%C3%ADcio-do-m%C3%B3dulo  
https://trello.com/c/ic9G4Prb/301-unidades  

### Relatório  
Foi feito uma revisão de todo o código para o componente e pagina em questão.  

<!-- O resultado foi que o componente foi **APROVADO** e o mesmo será movido para "Revisão Aprovada* e entrará em produção no proximo deploy.   -->

O resultado foi que a revisão foi **REPROVADA**, sendo necessário alguns ajustes para conclusão.

Segue a lista dos ajustes necessários:

- **Listagem**
  - Conferir CNPJ para CNPJ/CPF e as mascadas corretas (MP-03)
- **Geral**
  - Conferir os itens que no banco de dados são obrigatórios (MP-01)
    - Pode ser verificado pela imagem do banco no steps (losango marcado), mas o **mais indicado** é abrir o mySQL Workbench, pois la mostra todos os campos da tabela, e não apenas o resumo
    - Assinalar eles sempre com *
    - Ex.: Website (obrigatório)
    - Ex.: Numero (NÃO obrigatório)
    - Ex.: Telefone 1 (obrigatório)
    - Ex.: Telefone 2 (NÃO obrigatório) (mas esta sendo obrigatório no código)
  - Ocultar no formulário Outro1 e Outro2 (vamos deixar no sistema, mas sem uso por enquanto)
    - Talvez seria bom continuar enviando sempre o valor "" para o backend
  - Mensagem informativa ao não preencher um campo (MP-02)
    - Vários campos em branco, quando clico para enviar, aparece mensagem em inglês
  - CEP:
    - Ao consultar, preencher tambem estado/cidade
    - **TODOS os input que temos CEP**
- **Responsaveis**
  - Após cadastrar um registro, atualizar a tabela
    - Ao atualizar a tabela esta sendo atualizada
    - Mas ao cadastrar a tabela fica branca, inclusive some os outros registros antigos (MP-04)
  - Input PAIS, sempre desabilitado e com Brasil selecionado (SEMPRE que tivermos no sistema)
- **Arquivos**
  - Dividir a tela para caber 3 arquivos por linha em desktop (manter tamanho) (MP-05 e MP-06)
    - Ele está dividindo com base na quantidade de arquivos, mas o ideal é sempre manter o tamanho max
  - Após adicionar um arquivo, atualizar a visualização
    - Quando remove está sendo atualizado a listagem