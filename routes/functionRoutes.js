const express = require('express');
const router = express.Router();
const pool = require('../db');

let users = [
    {
      username: "admin",
      password: "111",
      id: 1
    },
    {
      username: "ad",
      password: "2",
      id: 2
    }
  ]

router.get('/sort/top100/:item/:sorttype', async (req, res) => {
    try {
        const item = req.params.item
        const sorttype = req.params.sorttype

        const result = await pool.query(`SELECT * FROM public.bank_data2 ORDER BY ${item} ${sorttype} LIMIT 100;`);
        res.json(result.rows);
    }

    catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
})

router.post('/add/new_data', async (req, res) => {
    const { age, job, marital, education, default: def, balance, housing, loan, contact, day, month, duration, campaign, pdays, previous, poutcome, y } = req.body;
    try {
        await pool.query(
            'INSERT INTO public.bank_data2 (age, job, marital, education, "default", balance, housing, loan, contact, day, month, duration, campaign, pdays, previous, poutcome, y) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)',
            [age, job.toLowerCase(), marital, education, def, balance, housing, loan, contact, day, month, duration, campaign, pdays, previous, poutcome, y]
        );
        res.json({
            message: "Add new data!",
            data: {
                age: age,
                job: job,
                marital: marital,
                education: education,
                "default": def,
                balance: balance,
                housing: housing,
                loan: loan,
                contact: contact,
                day: day,
                month: month,
                duration: duration,
                campaign: campaign,
                pdays: pdays,
                previous: previous,
                poutcome: poutcome,
                y: y
            }
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding new data');
    }
});



router.get('/filter', async (req, res) => {
    const { job, minBalance, maxBalance } = req.query; 
    let query = 'SELECT * FROM public.bank_data2 WHERE 1=1'; 
    const queryParams = [];

    if (job) {
        query += ' AND job = $1';
        queryParams.push(job);
    }
    if (minBalance) {
        query += ' AND balance >= $2';
        queryParams.push(minBalance);
    }
    if (maxBalance) {
        query += ' AND balance <= $3';
        queryParams.push(maxBalance);
    }

    try {
        const result = await pool.query(query, queryParams);
        res.json(result.rows); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;