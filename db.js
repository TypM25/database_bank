const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://pin:XJQWxmZP7d7RZUZlTKjGwCmiswr7HdPo@dpg-csfrkltsvqrc739qoru0-a.singapore-postgres.render.com/dbbank_dbpb',
});

module.exports = pool;
