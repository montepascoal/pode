export function mascaraCPF(cpf) {
  cpf=cpf.replace(/\D/g,"")                    
  cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")       
  cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
  cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2") 

  return cpf;
}

export function mascaraCNPJ(cnpj) {
  if (cnpj.length >= 18) {
    cnpj = cnpj.substr(0, 18);
    return cnpj;
  }
  cnpj = cnpj.replace(/\D/g, "")
  cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2")
  cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
  cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2")
  cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2")

  if (cnpj.length >= 18) {
    cnpj = cnpj.substr(0, 18);
    return cnpj;
  }
  cnpj = cnpj.replace(/\D/g, "")
  cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2")
  cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
  cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2")
  cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2")

  return cnpj
}

export function mascaraPhone(phone) {
  if (phone.length >= 14) {
    if (phone.length >= 15) {
      phone = phone.substr(0, 14);
      return phone;
    }
  }
  phone = phone.replace(/\D/g, "")
  phone = phone.replace(/^(\d)/, "($1")
  phone = phone.replace(/(.{3})(\d)/, "$1)$2")
  if (phone.length === 9) {
    phone = phone.replace(/(.{1})$/, "-$1")
  } else if (phone.length === 10) {
    phone = phone.replace(/(.{2})$/, "-$1")
  } else if (phone.length === 11) {
    phone = phone.replace(/(.{3})$/, "-$1")
  } else if (phone.length === 12) {
    phone = phone.replace(/(.{4})$/, "-$1")
  } else if (phone.length > 12) {
    phone = phone.replace(/(.{4})$/, "-$1")
  }

  return phone;
}