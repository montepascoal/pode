import axios from "axios";
import Alert from "./Alert";
import { unmaskNumberValue } from "./mask";
import { stringCapitalizer } from "./strings";

export async function fetchCEP({ loading, setLoading, cep, states, cities }) {
  if(loading) return;
  
  const unmaskedCep = unmaskNumberValue(cep);
  const cepIsValid = unmaskedCep.length === 8;

  if(!cepIsValid) {
    Alert('error', 'Erro', 'Insira um CEP Válido para prosseguir');
    return
  }

  try {
    setLoading(true);
    const { data, status } = await axios.get(`https://viacep.com.br/ws/${unmaskedCep}/json`);

    if (status === 200 && !data?.erro) {
      const city = cities?.find(item => item.label === data.localidade)?.value ?? undefined;
      const state = states?.find(item => item.initials === data.uf)?.value ?? undefined;

      return {
        cep,
        address: stringCapitalizer(data.logradouro),
        complement: stringCapitalizer(data.complemento),
        district: stringCapitalizer(data.bairro),
        city,
        state
      }
    } else {
      throw new Error();
    }
  } catch (err) {
    console.error('ERROR API VIA CEP [GET]: ' + err)
    Alert('error', 'Erro', 'Ocorreu um erro ao buscar informações do CEP informado');
  } finally {
    setLoading(false);
  }
};