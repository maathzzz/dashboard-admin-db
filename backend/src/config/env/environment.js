require('dotenv').config();

const envs = {
  PORT: process.env.PORT || 3000, 
  DATABASE_URL: process.env.DATABASE_URL, 
  PGUSER: process.env.PGUSER,
  PGHOST: process.env.PGHOST,
  PGDATABASE: process.env.PGDATABASE,
  PGPASSWORD: process.env.PGPASSWORD,
  PGPORT: process.env.PGPORT,
};

console.log(envs); 

module.exports = envs;
