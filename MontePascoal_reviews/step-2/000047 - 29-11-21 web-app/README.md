# Instituto Monte Pascoal - 000047

## **Review**
## Data: 29/11/21
## System: web-app

***

> ## Pagina: Listagem de Unidades 
> ## Pagina: Visualização de Unidades 
> ## Pagina: Edição de Unidades 
> ## Pagina: Criação de Unidades 

### Trello
https://trello.com/c/xmtwl4AX/212-pagina-listagem-empresas  
https://trello.com/c/dLFbvgq0/211-pagina-visualiza%C3%A7%C3%A3o-empresa  
https://trello.com/c/dExvSrak/213-pagina-edi%C3%A7%C3%A3o-empresa  
https://trello.com/c/TzeD09q2/253-pagina-adicionar-empresa  

### Relatório  
Foi feito uma revisão de todo o código para o componente e pagina em questão.  

<!-- O resultado foi que o componente foi **APROVADO** e o mesmo será movido para "Revisão Aprovada* e entrará em produção no proximo deploy.   -->

O resultado foi que a revisão foi **REPROVADA**, sendo necessário alguns ajustes para conclusão.

Segue a lista dos ajustes necessários:

- **Navbar**
  - O link no menu em Unidades, está apenas no texto, precisa ser em todo a área  (MP-01 e MP-02)
- **Listagem**
  - Erro ao exportar PDF (MP-03)
  - Alterar "Adicionar Unidade" para "Nova Unidade"
  - O hover do botão exportar, está apenas para o texto "Exportar", e não também no icon
  - Nas legendas, retirar o traço "-", e manter apenas o icon e texto, sem o módulo, apenas o status (Ativo/Inativo)
  - Legenda Status para Legenda
- **Visualização** / **Edição** / **Cadastrar**
  - Status (Ativo/Inativo)
    - Alterar os textos
    - Adicionar botão para alterar o status, esse select sempre ficará desabilitado, apenas com o botão que será alterado
    - Botão aparecerá apenas na tela de Edição (MP-06 e MP-07)
  - Remover mascara da inscrição estadual
  - Adicionar campos Controle (MP-05)
    - Não exibir eles na tela de cadastrar  
    - Os campos sempre bloqueados
  - CEP
    - Integrar com api dos correios para obter os dados de endereço
    - Sempre que o usuário entrar no campo, e sair, ao sair realizar a requisição e alterar os dados dos inputs pertinentes
    - https://viacep.com.br/ws/01001000/json/
  - CNPJ
    - Integrar com api para obter os dados
    - Sempre que o usuário entrar no campo, e sair, ao sair realizar a requisição e alterar os dados dos inputs pertinentes
    - https://www.receitaws.com.br/v1/cnpj/15436940000103
  - Estado e Cidade, manter como está com dados sem consistência  
  - Telefone
    - Permitir a mascara para celular e fixo
    - Se for telefone fixo, ao sair do input, alterar a mascara para fixo, e não deixar um risco no input (MP-04)
  - Whatsapp
    - Colocar obrigatório
    - Permitir a mascara para celular e fixo
    - Se for telefone fixo, ao sair do input, alterar a mascara para fixo, e não deixar um risco no input (MP-04)
  - Sempre antes de enviar para cadastrar e alterar, verificar se os dados são validos, lenght, tipo, se está vazio e etc
- **Visualização**
  - ok
- **Edição**
  - Alterar texto dos botões: (apenas)
    - Cancelar
    - Salvar
  - Ação do botão Cancelar
    - Atualizar a tela (reload) para obter novamente os dados antigos sem possível alteração
- **Cadastrar**
  - ok