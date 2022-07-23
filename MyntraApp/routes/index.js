var express = require('express');
var router = express.Router();
var GoogleAuth = require('passport-google-oauth20').Strategy
var passport = require('passport')
let UserModel = require('./users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/auth', function(req, res, next) {
  res.render('profile');
}); 

passport.use(
  new GoogleAuth({
    clientID : '1068781243191-3c4qcnnrl49k8njiskp9ivi6t44ga3sl.apps.googleusercontent.com' ,
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth'
  }, function(accesstoken, refreshtoken, profile, done){
    console.log('working');
    UserModel.findOne({googleID: profile.id})
    .then(function(foundUser){
      if(foundUser){
        done(null, foundUser)
      }
      else{
        new UserModel({
          googleID: profile.id
        })
        .save()
        .then(function(newuser){
          done(nul, newuser)
        })
            }
    })
  }
  )
)

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/auth', passport.authenticate('google', {failureRedirect:'/localhost:3000/'}), function(req, res, next) {
  res.render('profile');
});

router.get('/google', passport.authenticate('google', {
  scope:['profile', 'email']
}), function(req, res){

})

router.get('/logout', function(req, res){
  req.logOut();
  res.redirect('/')
})

module.exports = router;
