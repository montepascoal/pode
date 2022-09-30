import * as CryptoJS from 'crypto-js';

const vector = CryptoJS.enc.Base64.parse("");
const key    = CryptoJS.SHA256(process.env.REACT_APP_CRYPTO_KEY);
let encryptedString;

export function Encrypt(data){
  if(typeof data == "string"){
    data = data.slice();
    encryptedString = CryptoJS.AES.encrypt(data, key, {
      vector: vector,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
  } else{
    encryptedString = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
      vector: vector,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });  
  }

  return encryptedString.toString();
}

export function Decrypt(encrypted){

  if(encrypted === null) {
    return null;
  }

  const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
  	vector: vector,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });

  return decrypted.toString(CryptoJS.enc.Utf8)
}