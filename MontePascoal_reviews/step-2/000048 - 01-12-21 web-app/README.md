# Instituto Monte Pascoal - 000048

## **Review**
## Data: 01/12/21
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

- **Visualização**
  - ok
- **Edição**
  - Status (Ativo/Inativo)
    - Botão na cor amarelo 
    - Colocar mesmo estilo da imagem (MP-01)
    - Pode criar um botão ButtonAlert, para todos os subsistemas terão o mesmo estilo, e não a cor primary
  - CEP
    - Se o usuário digitar um CEP inválido, emitir um alerta ao sair do input informando
    - 74.430-031 (teste)
      - A requisição recebera status 200, porem con conteúdo "erro"
  - Whatsapp
    - Colocar obrigatório
  - CNPJ
    - Erro ao consultar CNPJ (MP-03)
    - A requisição esta dando erro, pode ser CORS
    - Eu precisei utilizar: dataType: "jsonp"
    - Da uma olhada na documentação da api **receitaws** se eles tem algo atualizado
    - Exemplo realizado, porem com jquery
      ```js
        function getApiCnpj(cnpj) {
            $.ajax({
              url: `https://www.receitaws.com.br/v1/cnpj/${cnpj}`,
              type: "get",
              contentType: "application/json",
              dataType: "jsonp",
              crossDomain: true,
            })
              .done(function (data, status) {
                console.log(data);
                if (data.status !== "ERROR") {
                  $("#txtNameCnpj").val(stringsPrimeiraMaiuscula(data.fantasia));
                  $("#txtNameCompany").val(stringsPrimeiraMaiuscula(data.nome));
                  $("#txtAddCep").val(data.cep);
                  tmpAddressComplement = data.complemento ? stringsPrimeiraMaiuscula(data.complemento) : null;
                  tmpAddressNumber = data.numero ? data.numero : null;
                  $("#txtConPhone1").val(data.telefone).trigger("input");
                  let tel = mNum($("#txtConPhone1").val());
                  if (tel.length === 11) {
                    $("#txtConPhone1").mask("(00) 0 0000-0000");
                  } else {
                    $("#txtConPhone1").mask("(00) 0000-0000");
                  }
                  getApiCep(mNum(data.cep));
                  $("#txtConEmail").val(stringsTudoMinusculo(data.email));
                  blockStop();
                } else {
                  tmpAddressComplement = null;
                  tmpAddressNumber = null;
                  // $("#txtDocCpfCnpj").val("");
                  viewNull();
                  $("#txtDocCpfCnpj").focus();
                  Toast.fire({
                    icon: "error",
                    title: "CNPJ inválido. Verifique e tente novamente",
                  });
                  blockStop();
                }
              })
              .fail(function (xhr, textStatus, errorThrown) {
                console.error(xhr);
                console.error(textStatus);
                console.log(errorThrown);
                tmpAddressComplement = null;
                tmpAddressNumber = null;
                if (xhr.status === 429) {
                  //error === 'Too many requests, please try again later.'
                  blockStop();
                  return 0;
                } else {
                  // $("#txtDocCpfCnpj").val("");
                  viewNull();
                  $("#txtDocCpfCnpj").focus();
                  Toast.fire({
                    icon: "error",
                    title: "Erro ao verificar CNPJ. Verifique e tente novamente",
                  });
                  blockStop();
                }
              });
          }
      ```
- **Cadastrar**
  - Campos Controle (MP-02)
    - **Não** exibir eles na tela de **cadastrar**  
  - Status (Ativo/Inativo)
    - O select para o status, estará sempre desabilitado, com valor 'Inativo' ao ser cadastrado um novo registro
  - CEP
    - Se o usuário digitar um CEP inválido, emitir um alerta ao sair do input informando
    - 74.430-031 (teste)
      - A requisição recebera status 200, porem con conteúdo "erro"
  - Whatsapp
    - Colocar obrigatório
  - CNPJ
    - Erro ao consultar CNPJ (MP-03)
    - A requisição esta dando erro, pode ser CORS
    - Eu precisei utilizar: dataType: "jsonp"
    - Da uma olhada na documentação da api **receitaws** se eles tem algo atualizado
    - Exemplo realizado, porem com jquery (mesmo acima)
  - Alterar texto dos botões: o texto ficar apenas:
    - Cadastrar