const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const controller = require('./controller');
require('dotenv').config();
const app = express();
app.use(bodyParser.json());

//massive
massive(process.env.CONNECTION_STRING).then(db => {
  app.set('db', db);
}).catch(error => {
  console.log('-------------- error', error);
});   

// Routes

app.get('/dashboard', controller.dashboard);
app.get('/shopping/:category/:id', controller.getSingleProduct);
app.get('/featuredproducts/:category', controller.getFeaturedProducts);






 
//port
const PORT = 4000;
app.listen(PORT, () => console.log(`Server Is Listening On port ${4000}`));