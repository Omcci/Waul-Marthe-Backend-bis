// const dotenv = require('dotenv')
// dotenv.config()
// const sql = require('mssql')

// const {DB_USER,
//   DB_PASSWORD,
//    DB_HOST, 
//    DB_NAME} = process.env

// const config = { 
//   user: DB_USER,
//   password: DB_PASSWORD,
//   server: DB_HOST, 
//   database: DB_NAME,
//   port: 1433,
//   options: {
//     trustServerCertificate: true
// }
// }

// const poolPromise = new sql.ConnectionPool(config)
//   .connect()
//   .then(pool => {
//     console.log('Connected to MSSQL')
//     return pool
//   })
//   .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

// module.exports = {
//   sql, poolPromise
// }

// import dotenv from 'dotenv';
// import sql from 'mssql';

// dotenv.config();
const dotenv = require('dotenv')
dotenv.config()
const sql = require('mssql')
  
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME
} = process.env;

const config = {
  user: DB_USER,
  password: DB_PASSWORD,
  server: DB_HOST,
  database: DB_NAME,
  port: 1433,
  options: {
    trustServerCertificate: true
  }
};

let pool;

const db = {
  connect: async () => {
    pool = await new sql.ConnectionPool(config).connect();
    console.log('Connected to MSSQL');
  },

  query: async (queryString, params = []) => {
    if (!pool) {
      throw new Error('Not connected to database');
    }

    const request = new sql.Request(pool);
    params.forEach((param, index) => {
      request.input(`param${index}`, param);
    });

    return await request.query(queryString);
  },

  close: () => {
    if (pool) {
      pool.close();
    }
  }
};

// Initialize the database connection right away
db.connect().catch(err => console.log('Database Connection Failed! Bad Config: ', err));

export { db };
