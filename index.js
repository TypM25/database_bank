const express = require('express');
const bodyparser = require('body-parser')
const cors = require('cors')
const dataRoutes = require('./routes/dataRoutes')
const functionRoutes = require('./routes/functionRoutes')

const PORT = process.env.PORT || 5000;


const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use('/api',dataRoutes);
app.use('/api',functionRoutes);

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});



app.listen(PORT, (req, res) => {
  console.log('Suscess to connect server!');
})