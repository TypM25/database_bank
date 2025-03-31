const { Pool } = require('pg');

const pool = new Pool({
  connectionString: "postgresql://pin:XJQWxmZP7d7RZUZlTKjGwCmiswr7HdPo@dpg-csfrkltsvqrc739qoru0-a.singapore-postgres.render.com/dbbank_dbpb",
  ssl: {
    rejectUnauthorized: true, // หรือสามารถใช้ `sslmode` เป็น 'require' แทน
  },
});

module.exports = pool;
