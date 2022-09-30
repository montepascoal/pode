const bcrypt = require('bcrypt');
const saltRounds = 10;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// FUNCTIONS AUX /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const functions = {
  async generate(password) {
    const hash = await bcrypt.hashSync(password, saltRounds);
    return hash;
    // bcrypt.hash(password, saltRounds, function(err, hash) {
    //   res(hash);
    // });
  },

  async validate(password, hash) {
    try {
      console.log('11111111111111')
      const isValid = await bcrypt.compareSync(password, hash);
      console.log('22222222222222')
      console.log(isValid)
      console.log('333333333333333')
      return isValid;
    } catch (error) {
      console.log(error)
      return false
    }
    // bcrypt.compare(hash, saltRounds, function(err, result) {
    //   res(result);
    // });
  },

};

module.exports = functions;
