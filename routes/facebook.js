var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
const mysqlCon = require('./mysql-con');
const cors = require('cors');

const session =  require('express-session');
const passport = require("passport");
const facebookS = require('passport-facebook');

router.use(express.json())
router.use(cors())
router.use(session({
    secret : 'da',
    resave : true,
    saveUninitialized : true,
    enableProof: true
}))
var fbopt = {
    clientID: '533426124007638',
    clientSecret: '84f820a46e74f2311448fffb74efe163',
    callbackURL: 'http://localhost:4000/auth/facebook/callback',
    profileFields : ['id', 'email', 'name'],
    enableProof: true
}

var fbcall = function(accessToken, refreshToken, profile, cb){
console.log(accessToken, refreshToken, profile)
cb(null, profile);
}
passport.use(new facebookS(fbopt, fbcall))
console.log('req.userfacebook - ');
/* GET home page. */
router.get('/', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
  }));
 
  
  router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res, err,user,info) {
      console.log('req.user - ' + err);
    //res.redirect(`http://localhost:3000/profile`);
    });
module.exports = router;
