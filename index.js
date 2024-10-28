const express = require('express');
const bodyparser = require('body-parser')
const cors = require('cors')
const dataRoutes = require('./routes/dataRoutes')
const functionRoutes = require('./routes/functionRoutes')

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use('/api',dataRoutes);
app.use('/api',functionRoutes);

const PORT = process.env.PORT || 5000;


app.listen(PORT, (req, res) => {
  console.log('Suscess to connect server!'); //ให้serverเห็น
})