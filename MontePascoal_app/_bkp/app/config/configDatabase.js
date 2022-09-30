module.exports = {
  // devDevelopmentProduction
  host: process.env.DB_HOST || '192.168.0.25',
  database: process.env.DB_NAME || 'dbFaciliteCard',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'db@2021',
  dialect: process.env.DB_DIALECT || 'postgres',
  port: process.env.DB_PORT || '45720', // PROD 5432 / DEV 45721
  charset: 'utf8',
  collate: 'utf8_general_ci',
  dialectOptions: {
    // typeCast: function (field, next) {
    //   if (field.type == 'DATETIME' || field.type == 'TIMESTAMP') {
    //       return new Date(field.string() + 'Z');
    //   }
    //   return next();
    // }
    // timezone: '-03:00' //for writing to database
  },
  // timezone: '-03:00', //for writing to database
  logging: process.env.SYSTEM_DEBUG_DB === 'true' ? true : false,
};
