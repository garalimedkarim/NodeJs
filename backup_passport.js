*config/passport.js
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//Load User Model:
require('../models/User');
const User= mongoose.model("Users");

module.exports = function(passport){
	passport.use(
		new LocalStrategy({usernameField:'email'},
		(email,password,done)=>{
			User.findOne({email:email})
			.then(function(user){
				if(!user)
					return done(null,false,{message: 'No user found'});
			});
		})
	);
}

*app.js :

	//---------------Passport Config------------------------

	require("./config/passport")(passport);
	
*routes/login.js:
	//login form handle
	router.post("/login",function(req,res,next){
		passport.authenticate('local',{
			successRedirect: '/ideas',
			failureRedirect: '/users/login',
			failureFlash: true,
		})(req,res,next);
	});	



///////////////////////
* app.js :
+const passport = require('passport');
+const LocalStrategy = require('passport-local').Strat
egy;
+const bcrypt = require("bcryptjs");

+// passport middleware :
+app.use(passport.initialize());
+app.use(passport.session());

// handle login form:
app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
  })
);

app.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
});

app.get('/loginSuccess', function(req, res, next) {
  res.send('Successfully authenticated');
});

passport.serializeUser(function(user, done) {
  done(null, user);
  console.log("1",user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
  console.log("2",user);
});
// Load User Model:
require('./models/User');
const User = mongoose.model('Users');

passport.use(
new LocalStrategy({usernameField:'email'},function(email, password, done){
 
  process.nextTick(function() {
    User.findOne({
      'email': email, 
    }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      if (!bcrypt.compareSync(password,user.password) ) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
}));