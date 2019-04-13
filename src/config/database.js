const env = require('dotenv').config();
const path = require('path');

const config = {
  default: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT || 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || '127.0.0.1',
    operatorsAliases: false,
  },
  development: {
    extend: 'default',
    host: '127.0.0.1',
    database: 'lr_dev',
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', '..', 'db_dev', 'dev.db'),
  },
  test: {
    extend: 'default',
    database: 'lr_test',
  },
  production: {
    extend: 'default',
    database: 'lr',
    // use_env_variable: 'DATABASE_URL',
  },
};

Object.keys(config).forEach((configKey) => {
  const configValue = config[configKey];
  if (configValue.extend) {
    config[configKey] = Object.assign({}, config[configValue.extend], configValue);
  }
});

module.exports = config;
