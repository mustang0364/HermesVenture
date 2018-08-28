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
  secret:process.env.SESSION_SECRET,
  saveUninitialized:false,
  resave:false,
}))

app.use(express.static(`${__dirname}/../build`))

app.get('/auth/callback',(req,res)=>{ 
    
    const payload={
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        client_secret:process.env.AUTH0_CLIENT_SECRET,
        code : req.query.code,
        grant_type:'authorization_code',
        redirect_uri:`http://${req.headers.host}/auth/callback`
    
    };

    function tradeCodeForAccessToken(){
      console.log(payload)
        return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload)
    }

    
      
      
      function tradeAccessTokenForUserInfo(response) {
        console.log(response.data.access_token)
        const accessToken = response.data.access_token
        return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`) 
      }
      
      
     
      function storeUserInfoInDataBase(response) {
        console.log('-------- response.data',response.data)
        const auth0id = response.data.sub;
        return req.app.get('db').find_user_by_auth0_id(auth0id).then(users => {
          console.log('users', users)
          if (users.length) {
            const user = users[0];
            req.session.user = user;
            console.log(user)
            res.redirect('/');
          } else {
            const createUserData = {
              auth0_id: auth0id,
              email: response.data.email,
              profile_name: response.data.name,
              picture: response.data.picture
            }
            return req.app.get('db').create_user(createUserData).then(newUsers => {
              console.log(newUsers)
              const user = newUsers[0];
              req.session.user = user; 
              res.redirect('/');
            })
          }
        })
      }
       
      
      
      tradeCodeForAccessToken()
      .then(accessToken => tradeAccessTokenForUserInfo(accessToken))
      .then(userInfo => storeUserInfoInDataBase(userInfo))
      .catch(error => {
        console.log('------- error',error)
        res.status(500).json({message: 'Server error. See server terminal'})
      })
    });
    
    app.post('/api/logout', (req, res) => {
      req.session.destroy();
      res.send();
    });
    
    app.get('/api/user-data', (req, res) => {
      res.json({ user: req.session.user });
    });
    
    function checkLoggedIn(req, res, next) {
      if (req.session.user) {
        next();
      } else {
        res.status(403).json({ message: 'Unauthorized' });
      }
    }
    
    app.get('/api/secure-data', checkLoggedIn, (req, res) => {
      res.json({ someSecureData: 123 });
    });
    

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





//---------------////
// app.use(session({
//   secret: 'Hermes Venture',
//   resave: false,
//   saveUninitialized: false,
// }))