var LocalStrategy = require('passport-local').Strategy;



  module.exports = function(){
    passport.use(new LocalStrategy(
        function(email, password, done) {
          userr.findOne({ email: email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
          });
        }
      ));
  }