const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const controller = require('./controller');
const session = require('express-session');
require('dotenv').config();
const app = express();
app.use(bodyParser.json());

//massive
massive(process.env.CONNECTION_STRING).then(db => {
  app.set('db', db);
}).catch(error => {
  console.log('-------------- error', error);
});  

app.use(session({
  secret: 'Hermes Venture',
  resave: false,
  saveUninitialized: false,
}))


// Routes

app.get('/dashboard', controller.dashboard);
app.get('/shopping/:category/:id', controller.getSingleProduct);
app.get('/featuredproducts/:category', controller.getFeaturedProducts);
app.post('/orderNumber/:id', controller.createOrderNumber);
app.post('/charge', controller.stripe);
app.post('/createOrder', controller.createOrder);






 
//port
const PORT = 4000;
app.listen(PORT, () => console.log(`Server Is Listening On port ${4000}`));