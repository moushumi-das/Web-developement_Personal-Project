//Passport strategy for authenticating with a username and password.

const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')

/*The local authentication strategy authenticates users using a username and password.
  The strategy requires a verify callback, which accepts these credentials and calls 'done' providing a user.
  'done' is the callback function */

function init(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async(email, password, done) => {
        const user = await User.findOne({ email: email })
        if (!user) {
            return done(null, false, { message: 'No user with this email' })
        }

        // 'bcrypt.compare' is used to compare the password with the password stored on the database
        bcrypt.compare(password, user.password).then(match => {
            if (match) {
                return done(null, user, { message: 'Logged in successfully' })
            }
            return done(null, false, { message: 'Wrong username or password' })
        }).catch(err => {
            return done(null, false, { message: 'Something went wrong' })
        })

    }))

    //store user's id in a session after successfully logged into their account
    passport.serializeUser((user, done) => {
            done(null, user._id)
        })
        // 
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })

    })

}

module.exports = init