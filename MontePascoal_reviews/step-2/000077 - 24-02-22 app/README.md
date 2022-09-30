# Instituto Monte Pascoal - 000077

## **Review**
## Data: 24/02/22 
## System: app

***

> ## Módulo: EMPRESA (COMPANIES-MAIN)   
> ## Módulo: UNIDADES (COMPANIES)   
> ## Módulo: DOCUMENTAÇÃO (INSOMNIA e web build)   

### Trello
https://trello.com/c/0NgpZHkm/329-ajustes  

### Relatório  
Foi feito uma revisão de todo o código para o componente e pagina em questão.  

<!-- O resultado foi que o componente foi **APROVADO** e o mesmo será movido para "Revisão Aprovada* e entrará em produção no proximo deploy.   -->

O resultado foi que a revisão foi **REPROVADA**, sendo necessário alguns ajustes para conclusão.

Segue a lista dos ajustes necessários:

- **EMPRESA**
  - `comConMediaWebSite` NÃO foi alterado para `comConMediaWebsite` na controller (MP-02)
    - Assim ele não é reconhecido pelo backend
    - Atualizar migration
- **UNIDADES**
  - Foi removido o `comStatus` ao criar uma nova unidade POST (MP-01)
    - Sempre ao criar precisa ser `true`
  - `comConMediaWebSite` NÃO foi alterado para `comConMediaWebsite` na controller (MP-02)
    - Assim ele não é reconhecido pelo backend
  - Testar o POST ao criar unidade (erro de fields) (MP-05)
- **DOCUMENTAÇÃO**
  - EMPRESA - Atualizar na documentação `comConMediaWebsite` (MP-03)
  - UNIDADES - Atualizar na documentação `comConMediaWebsite` (MP-03)
  - Atualizar na documentação os parametros completos e o que é null e o que é not null e o que é chave (MP-04)
    - Para **TODAS** as rotas (MP-06)