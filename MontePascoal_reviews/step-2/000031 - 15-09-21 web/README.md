# Instituto Monte Pascoal - 000031

## **Review**
## Data: 15/09/21
## System: web-app

***

> ## Componente: Breadcrumb

### Trello
https://trello.com/c/7T38VRin/174-breadcrumb  
https://trello.com/c/fEYpf5mK/172-criar-branch-breadcrumb  

### Relatório  
Foi feito uma revisão de todo o código para o componente e pagina em questão.  

O resultado foi que o componente foi **APROVADO** e o mesmo será movido para "Revisão Aprovada* e entrará em produção no proximo deploy.  

<!-- O resultado foi que a revisão foi **REPROVADA**, sendo necessário alguns ajustes para conclusão.

Segue a lista dos ajustes necessários:

- **COMPONENTE BREADCRUMB**
  - Não utilizar o useEffect para adicionar dados iniciais. Fazer isso diretamente ao declarar o state **crumbs**
  - Remover o atributo do state **crumbs** "active", pois sempre o item ativo será o último, então não precisamos todas as vezes ter de enviar manualmente essa informação
  - Corrigir e deixar uniforme as margens e espaçamentos.
    - Uma sugestão é manter a margem apenas no svg, e labels sem margem, assim sempre terá um padrão independente do tamanho do texto adicionado -->