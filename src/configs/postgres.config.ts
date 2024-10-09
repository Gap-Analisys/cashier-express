import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT || '5432')
});

const connectPostgres = async () => {
  try {
    await pool.connect();
    console.log('PostgreSQL connected successfully');
  } catch (err) {
    console.error('PostgreSQL Connection Error:', err);
    process.exit(1);
  }
};

export { pool, connectPostgres };
