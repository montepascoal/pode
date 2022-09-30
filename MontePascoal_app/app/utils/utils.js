var fs = require('fs');
const path = require('path');

const functions = {
  teste() {
    return 'teste';
  },

  numbersFormatarDuasCasas(number) {
    if (number < 10) {
      return '0' + number;
    } else {
      return '' + number;
    }
  },

  dateDateStrToDate(strDate) {
    try {
      if (strDate.length !== 10) {
        return false;
      }
      strDate += 'T12:00:00.000Z';
      let varDate = new Date(strDate);

      let testDate = varDate.getDate();
      if (isNaN(testDate)) {
        return false;
      }
      return varDate;
    } catch (error) {
      return false;
    }
  },

  validateCpf(strCpf) {
    try {
      var Soma = 0;
      var Resto;
      if (strCpf == '00000000000') return false;
      if (strCpf == '11111111111') return false;
      if (strCpf == '22222222222') return false;
      if (strCpf == '33333333333') return false;
      if (strCpf == '44444444444') return false;
      if (strCpf == '55555555555') return false;
      if (strCpf == '66666666666') return false;
      if (strCpf == '77777777777') return false;
      if (strCpf == '88888888888') return false;
      if (strCpf == '99999999999') return false;

      for (i = 1; i <= 9; i++)
        Soma = Soma + parseInt(strCpf.substring(i - 1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;

      if (Resto == 10 || Resto == 11) Resto = 0;
      if (Resto != parseInt(strCpf.substring(9, 10))) return false;

      Soma = 0;
      for (i = 1; i <= 10; i++)
        Soma = Soma + parseInt(strCpf.substring(i - 1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;

      if (Resto == 10 || Resto == 11) Resto = 0;
      if (Resto != parseInt(strCpf.substring(10, 11))) return false;

      return true;
    } catch (error) {
      return false;
    }
  },

  validateCnpj(strCnpj) {
    try {
      var b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

      if ((strCnpj = strCnpj.replace(/[^\d]/g, '')).length != 14) return false;

      if (/0{14}/.test(strCnpj)) return false;

      for (var i = 0, n = 0; i < 12; n += strCnpj[i] * b[++i]);
      if (strCnpj[12] != ((n %= 11) < 2 ? 0 : 11 - n)) return false;

      for (var i = 0, n = 0; i <= 12; n += strCnpj[i] * b[i++]);
      if (strCnpj[13] != ((n %= 11) < 2 ? 0 : 11 - n)) return false;

      return true;
    } catch (error) {
      return false;
    }
  },

  validateBoolean(varBoolean) {
    return varBoolean === true || varBoolean === false;
  },

  validateNumberPositive(varNumber) {
    return varNumber > 0;
  },

  validateNumberPositiveZero(varNumber) {
    return varNumber >= 0;
  },

  validateNumberNegative(varNumber) {
    return varNumber < 0;
  },

  validateAlphaNumeric(str) {
    var code, i, len;
    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i);
      if (
        !(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123) && // lower alpha (a-z)
        !(code == 45)
      ) {
        // -
        return false;
      }
    }
    return true;
  },

  devDebugError(error) {
    if (process.env.SYSTEM_DEBUG_OBJ == 'true') {
      return error;
    } else {
      return { errMessage: 'Error system' };
    }
  },
  devLog(type, msg, obj) {
    this.logTXT(type, msg, obj);
    if (process.env.SYSTEM_DEBUG_OBJ == 'true') {
      auxDevLog(msg, obj);
    } else {
      auxDevLog(msg, null);
    }
  },
  devError(type, msg, error) {
    if (process.env.SYSTEM_DEBUG_OBJ == 'true') {
      auxDevError(msg, error);
    } else {
      auxDevError(msg, error);
    }
  },
  devResSuccess(msg, data, next) {
    auxDevLog(msg, data);
    const objRes = {
      resStatus: true,
      resNext: next !== undefined ? next : true,
      resData: data,
      resMessage: msg,
    };
    return objRes;
  },

  devResError(msg, error) {
    auxDevError(msg, error);
    const objRes = { resStatus: false, resData: error, resMessage: msg };
    return objRes;
  },

  resSuccess(msg, data, res) {
    this.logTXT(3, 'HTTP Code => ' + 200, null);
    this.logTXT(3, msg, null);

    if (res) {
      res.statusCode = 200;
      return res.send({ resMessage: msg, resData: data });
    } else {
      return { resStatus: 200, resMessage: msg, resData: data };
    }
  },
  resError(httpCode, msg, error, res) {
    this.devError(false, `HTTP Code => ${httpCode}`);
    this.devError(false, msg, this.devDebugError(error));
    this.logTXT(4, 'HTTP Code => ' + httpCode, null);
    this.logTXT(4, msg, { errMessage: error ? error.message : null });
    if (
      httpCode === 301 || // Moved Permanently
      httpCode === 400 || // Bad Request
      httpCode === 401 || // Unauthorized
      httpCode === 403 || // Forbidden
      httpCode === 404 || // Not Found
      httpCode === 409 || // Conflict
      httpCode === 424 || // Failed Dependency
      httpCode === 500 // Internal Server Error
    ) {
      // httpCode = httpCode;
    } else {
      httpCode = 501;
    }
    if (res) {
      res.statusCode = httpCode;
      return res.send({ resMessage: msg, resData: error });
    } else {
      return { resStatus: httpCode, resMessage: msg, resData: error };
    }
  },

  logTXT(type, msg, obj) {
    let strLOG = '';

    if (msg) {
      switch (type) {
        case 0:
          strLOG = `►►►►► ${this.auxDevTimeNowToStr()} ==> ${msg}`;
          break;
        case 1:
          strLOG = `▬▬▬▬▬ ↔ ▬▬▬▬▬ ${this.auxDevTimeNowToStr()} ==> ${msg}`;
          break;
        case 2:
          strLOG = `■ ${this.auxDevTimeNowToStr()} ==> ${msg}`;
          break;
        case 3:
          strLOG = `◄◄◄◄◄ ${this.auxDevTimeNowToStr()} ==> ${msg}`;
          break;
        case 4:
          strLOG = `§§§§§ ${this.auxDevTimeNowToStr()} ==> ${msg}`;
          break;
        default:
          strLOG = `■ ${this.auxDevTimeNowToStr()} ==> ${msg}`;
          break;
      }
    }

    if (obj) {
      strLOG += `${msg ? '\n' : ''}` + JSON.stringify(obj);
    }

    const strFile =
      path.resolve(__dirname, '..', '..', 'logs') +
      `/${auxDevDateNowToStr()}.txt`;
    fs.open(strFile, 'a', 666, function (e, id) {
      fs.write(id, strLOG + '\n', null, 'utf8', function () {
        fs.close(id, function () {});
      });
    });
  },

  auxDevTimeNowToStr(custom = true) {
    let varData = new Date();
    let dateTime =
      auxDevNumDoisDigitos(varData.getDate()) +
      '/' +
      auxDevNumDoisDigitos(varData.getMonth() + 1) +
      '/' +
      varData.getFullYear() +
      ' ' +
      auxDevNumDoisDigitos(varData.getHours()) +
      ':' +
      auxDevNumDoisDigitos(varData.getMinutes());

    if (custom) {
      dateTime =
        dateTime +
        ':' +
        auxDevNumDoisDigitos(varData.getSeconds()) +
        ':' +
        auxDevNumTresDigitos(varData.getMilliseconds());
    }

    return dateTime;
  },
};

const auxDevLog = (msg, obj) => {
  console.log('■', functions.auxDevTimeNowToStr(), '==>', msg ? msg : '');
  obj ? console.log(obj) : null;
};
const auxDevError = (msg, error) => {
  error
    ? console.error('♦', functions.auxDevTimeNowToStr(), '==> Description:')
    : null;
  error ? console.log('---------------------') : null;
  error ? console.error(error) : null;
  error ? console.log('---------------------') : null;
  console.error('♦', functions.auxDevTimeNowToStr(), '==>', msg);
};
const auxDevNumDoisDigitos = (num) => {
  if (num < 10) {
    return '0' + num;
  } else {
    return '' + num;
  }
};
const auxDevNumTresDigitos = (num) => {
  if (num < 10) {
    return '00' + num;
  } else if (num < 100) {
    return '0' + num;
  } else if (num < 1000) {
    return num;
  } else {
    return num.toString().substr(0, 3);
  }
};

const auxDevDateNowToStr = () => {
  let varData = new Date();
  return (
    varData.getFullYear() +
    '-' +
    auxDevNumDoisDigitos(varData.getMonth() + 1) +
    '-' +
    auxDevNumDoisDigitos(varData.getDate())
  );
};

module.exports = functions;
