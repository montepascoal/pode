export function validaCPF(valor){

  // Validar se é String
  if (typeof valor !== 'string') {
    return false;
  } 

  // Tirar formatação
  valor = valor.replace(/[^\d]+/g, '');

  // Validar se tem tamanho 11 ou se é uma sequência de digitos repetidos
  if (valor.length !== 11 || !!valor.match(/(\d)\1{10}/)) {
    return false; 
  }

  // String para Array
  valor = valor.split('');

  const validator = valor
      // Pegar os últimos 2 digitos de validação
      .filter((digit, index, array) => index >= array.length - 2 && digit)
      // Transformar digitos em números
      .map( el => +el );

  const toValidate = pop => valor
      // Pegar Array de items para validar
      .filter((digit, index, array) => index < array.length - pop && digit)
      // Transformar digitos em números
      .map(el => +el);

  const rest = (count, pop) => (toValidate(pop)
      // Calcular Soma dos digitos e multiplicar por 10
      .reduce((soma, el, i) => soma + el * (count - i), 0) * 10) % 11 % 10;

  return !(rest(10,2) !== validator[0] || rest(11,1) !== validator[1])

}