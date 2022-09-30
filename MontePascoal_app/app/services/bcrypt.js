const bcrypt = require('bcrypt');
const saltRounds = 10;

const functions = {
  async generate(password) {
    const hash = await bcrypt.hashSync(password, saltRounds);
    return hash;
  },

  async validate(password, hash) {
    try {
      const isValid = await bcrypt.compareSync(password, hash);
      return isValid;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

module.exports = functions;
