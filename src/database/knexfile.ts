require('dotenv').config();

export default {
  client: 'mysql',
  version: '5.5',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
};
