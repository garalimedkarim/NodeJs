// passport middleware
	* /config/passport.js:
	const mongoose = require('mongoose');
	const bcrypt = require("bcryptjs");
	const LocalStrategy = require("passport-local").Strategy;
	const passport = require("passport");

	//-------------------------------------------------------

	// Load User Model:
	require('../models/User');
	const User = mongoose.model('Users');

	//-------------------------------------------------------

	module.exports=function(passport){
		
		passport.use(
		new LocalStrategy({usernameField:'email'},function(email, password, done){

			User.findOne({'email':email},function(err, user) {	
				if (err)
					return done(err);
				if (!user)
					return done(null, false,{message:"You are not registred"});
				if (!bcrypt.compareSync(password,user.password) ){
					return done(null, false,{message:"Missing email or password !"});
				}
				return done(null, user);  
			});

		}));

		passport.serializeUser(function(user, done) {
			console.log("SERIALIZE");
			done(null, user.id);
		});

		passport.deserializeUser(function(id, done) {
			console.log("DESERIALIZE");
			User.findById(id, function(err, user) {
			done(err, user);
		  });
		});	
	}
	
	* /app.js:
	//call local-strategy:
	require("./config/passport")(passport);

// protecting routes
	/helpers/auth.js:
	module.exports = {
		ensureAuthenticated: function(req,res,next){
			if(req.isAuthenticated()){
				return next();
			}
			req.flash("error_msg","Not authorized access ");
			res.redirect("/users/login");
		}
	}
	
	*/routes/ideas.js:
	const {ensureAuthenticated} = require("../helpers/auth");

	// Load Idea Model:
	require('../models/Idea');
	const Idea = mongoose.model('ideas');

	//--------------------------------------------------

	// Ideas index page:
	router.get("/",ensureAuthenticated,(req,res)=>{
		Idea.find({'user':req.user.id})
		.sort({date:'desc'})
		.then(ideas=>{
			res.render("ideas/index",{
				ideas: ideas,
			});
		})	
	});
	
//routes export:
	*/routes/users.js:
	module.exports = router;
	
	*/appjs:
	// load routes :
	const ideas = require("./routes/ideas");
	const users = require("./routes/users");
	// Use routes :
	app.use("/ideas",ideas);
	app.use("/users",users);	