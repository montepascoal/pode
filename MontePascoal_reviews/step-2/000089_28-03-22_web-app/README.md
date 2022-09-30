# Instituto Monte Pascoal - 000089

## **Review**
## Data: 28/03/22 
## System: app

***

> ## Módulo: Novas atualizações solicitadas (GENERAL)  

### Trello
https://trello.com/c/TJRKw047/330-novas-atualiza%C3%A7%C3%B5es-solicitadas  
https://trello.com/c/aVGLY5wF/334-arquivos-visualiza%C3%A7%C3%A3o-e-download  

### Relatório  
Foi feito uma revisão de todo o código para o componente e pagina em questão.  

<!-- O resultado foi que o componente foi **APROVADO** e o mesmo será movido para "Revisão Aprovada* e entrará em produção no proximo deploy.   -->

O resultado foi que a revisão foi **REPROVADA**, sendo necessário alguns ajustes para conclusão.

Segue a lista dos ajustes necessários:

- **COMPANIES**
  - **TAB FILES**
    - **MODO VISUALIZAÇÃO**: Ao clicar no arquivo:
      - [x] Abrir pop-up para selecionar "Download" ou "Visualizar"
        - [x] Visualizar
          - Se for documentos word/excel, abrir utilizando a url da microsoft 
          - Se for outros arquivos, abrir em nova aba do navegador (próprio navegador possui os visualizadores)
        - [x] Download
          - Utilizar rota para download dos arquivos
    - **MODO EDIÇÃO**: Ao clicar no arquivo:
      - [x] Remove arquivo (OK como está)
    - **MODO ADICIONAR FILES**
      - [x] No input para adicionar arquivo, adicionar cursor pointer na area de arrastar/add arquivo (MP-01)
      - [x] Se o usuário por algum razão selecionar um arquivo incompatível com o sistema, precisamos informa-lo com uma mensagem
      - [x] Falha ao adicionar arquivo .odt
      - [x] Está permitindo selecionar mais de um arquivo (necessário apenas um arquivo por vez) (MP-02)
        - [x] Se selecionar, avisar falando para usuário adicionar um arquivo por vez
      - [x] Erro ao adicionar um arquivo .docx  
            Utilizando o insomnia, o mesmo arquivo temos sucesso (MP-03)  
            Porem enviando pelo sistema, recebemos o erro de tipo (MP-04)(MP-05)  
  - **TAB Geral**
    - [x] Ao clicar no arquivo:
      - Se for documentos word/excel, abrir utilizando a url da microsoft 
      - Se for outros arquivos, abrir em nova aba do navegador (próprio navegador possui os visualizadores)
