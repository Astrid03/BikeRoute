var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var models = require('../models')
var bcrypt = require('bcryptjs');

passport.serializeUser((user, done) => {
  done(null, user.username)
})

passport.deserializeUser((id, done) => {
  models.User.findById(id).then((user) => {
    done(null, user)
  }).catch((error) => {
    return done(error, null)
  })
})

// Use local strategy
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    models.User.findById(username).then(function (user) {
      if(!user){
      console.log('error');
        return done(null, false, {
          'errors': {
            'username': { type: 'Username is not registered.' }
          }
        });
      }
      if (!(bcrypt.compareSync(password, user.password))) {
        return done(null, false, {
          'errors': {
            'password': { type: 'Password is incorrect.' }
          }
        });
      }
      console.log('success')
      return done(null, user);
    }).catch((error) => {
      console.log(error)
      return done(error)
    })
  }
));
