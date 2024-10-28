const express = require('express');
const router = express.Router();
const pool = require('../db'); // ใช้ pool สำหรับการเชื่อมต่อกับฐานข้อมูล

let count = 1;
let users = [
  {
    username: "admin",
    password: "111",
    id: 1
  },
  {
    username: "ad2",
    password: "2",
    id: 2
  }
]


//All_data------------------------------------------------
router.get('/db', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.bank_data')
    res.json(result.rows)
  }
  catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
})

//Table Data------------------------------------------------
router.get('/db_100', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.bank_data WHERE id BETWEEN 1 AND 100;')
    res.json(result.rows)
  }
  catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
})

//BarGraph Job_Balances ------------------------------------------------
router.get('/bar/job/balances', async (req, res) => {
  const selectedJobs = req.query.jobs ? req.query.jobs.split(',') : [];

  let query = `SELECT job, AVG(balance) AS average_income FROM public.bank_data ${selectedJobs.length > 0 ? `WHERE job = ANY($1)` : ''} GROUP BY job;`;

  try {
    const result = await pool.query(query, selectedJobs.length > 0 ? [selectedJobs] : []);
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

//BarGraph Dril-down Job_Balances ------------------------------------------------
router.get('/bar/drilldown/:job', async (req, res) => {
  const job = req.params.job
  try {
    const result = await pool.query(`
        SELECT
            CASE 
                WHEN balance BETWEEN 0 AND 1000 THEN '0-1000'
                WHEN balance BETWEEN 1001 AND 2000 THEN '1001-2000'
                WHEN balance BETWEEN 2001 AND 3000 THEN '2001-3000'
                -- เพิ่มเงื่อนไขเพิ่มเติมตามที่ต้องการ
                ELSE 'Above 3000'
            END AS balance_range,
            COUNT(*) AS total_count
        FROM public.bank_data
        WHERE job = $1
        GROUP BY balance_range
        ORDER BY balance_range;
    `,[job]);
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});



//BarGraph Marital_balances ------------------------------------------------
router.get('/bar/marital/balances', async (req, res) => {
  try {
    const result = await pool.query('SELECT marital, AVG(balance) AS average_income FROM public.bank_data GROUP BY marital;')
    res.json(result.rows)
  }
  catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
})

//PieGraph Loan_House------------------------------------------------
router.get('/pie/house/loan', async (req, res) => {
  try {
    const result = await pool.query('SELECT loan, COUNT(*) AS count FROM public.bank_data WHERE housing = \'yes\' GROUP BY loan;');
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

//LineGraph age_House------------------------------------------------
router.get('/scatterplot/age/balance', async (req, res) => {
  try {
    const result = await pool.query('SELECT age, AVG(balance) AS average_income FROM public.bank_data GROUP BY age ORDER BY age ASC;');
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});


//Login User------------------------------------------------
router.get('/users', (req, res) => {
  res.json(users); //ให้user เห็น
})

module.exports = router;