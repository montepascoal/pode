import { parse, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';

/* eslint-disable no-redeclare */
/* eslint-disable eqeqeq */
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

export function validaCnpj(strCnpj) {
  var b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  if ((strCnpj = strCnpj.replace(/[^\d]/g, "")).length != 14)
    return false;

  if (/0{14}/.test(strCnpj))
    return false;

  for (var i = 0, n = 0; i < 12; n += strCnpj[i] * b[++i]);
  if (strCnpj[12] != (((n %= 11) < 2) ? 0 : 11 - n))
    return false;

  for (var i = 0, n = 0; i <= 12; n += strCnpj[i] * b[i++]);
  if (strCnpj[13] != (((n %= 11) < 2) ? 0 : 11 - n))
    return false;

  return true;
}

export function validaCnpjCpf(strValue) {
  const isCNPJ = validaCnpj(strValue);
  const isCPF = validaCPF(strValue);

  if(isCNPJ) return 'CNPJ';
  if(isCPF) return 'CPF';

  return null;
}

export function validaData(strData) {
  const parsedDate = parse(strData, 'P', new Date(), { locale: ptBR });
  const isValidDate = isValid(parsedDate);
  return isValidDate;
}