module.exports = {
  host: process.env.DB_HOST || '186.226.71.42',
  database: process.env.DB_NAME || 'montepascoalTEST',
  username: process.env.DB_USER || 'app-dev',
  password: process.env.DB_PASS || 'V6g7Dz05nu#p8oG!',
  dialect: process.env.DB_DIALECT || 'mssql',
  port: process.env.DB_PORT || '5134',
  charset: 'utf8',
  collate: 'utf8_general_ci',
  pool: {
    max: 10,
    min: 0,
    idle: 25000,
    acquire: 25000,
    requestTimeout: 300000,
  },
  dialectOptions: {
    options: { encrypt: true },
  },
};
