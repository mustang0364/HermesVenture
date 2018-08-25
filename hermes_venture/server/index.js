const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config();
const app = express();
app.use(bodyParser.json());

//massive
massive(process.env.CONNECTION_STRING).then(db => {
  app.set('db', db);
}).catch(error => {
  console.log('-------------- error', error);
});                      
 
//port
const PORT = 4000;
app.listen(PORT, () => console.log(`Server Is Listening On port ${4000}`));