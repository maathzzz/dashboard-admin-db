const { Pool } = require('pg');
const { DATABASE_URL, PGUSER, PGHOST, PGDATABASE, PGPASSWORD, PGPORT } = require('../config/env/environment'); 

let pool;

const open = async () => {
  try {
    const config = DATABASE_URL
      ? { connectionString: DATABASE_URL }
      : {
          user: PGUSER,
          host: PGHOST,
          database: PGDATABASE,
          password: PGPASSWORD,
          port: PGPORT,
        };

    pool = new Pool(config);

    const client = await pool.connect();
    console.log('Connected to the PostgreSQL database successfully ✅');
    client.release(); 
  } catch (error) {
    console.error('❌ Failed to connect to the database:', error);
    throw error; 
  }
};

const getPool = () => {
  if (!pool) {
    throw new Error('Database connection is not established. Call open() first.');
  }
  return pool;
};

module.exports = {
  open,
  getPool,
};
