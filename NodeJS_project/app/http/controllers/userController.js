const User = require('../../models/user') //Mongodb data model for users
const bcrypt = require('bcrypt') // To hash a password I am using bcrypt.
const passport = require('passport')




/* The async mode is recommended. This is because the hashing done by bcrypt is CPU intensive,
 so the sync version will block the event loop and prevent your application from servicing 
 any other inbound requests or events. The async version uses a thread pool which does not block the main event loop. */

function userController() {

    return {
        login(req, res) {
            res.render('login')
        },

        postLogin(req, res, next) {
            const { email, password } = req.body
                //console.log(req.body)

            // request validation
            if (!email || !password) {
                // if any field is empty then show the error message
                req.flash('error', 'All fields need to be filled')
                return res.redirect('/login')
            }
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    req.flash('error', info.message)
                    return next(err)
                }

                // if user is not found then redirect them to login page

                if (!user) {
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }
                req.login(user, (err) => {
                    if (err) {
                        req.flash('error', info.message)
                        return next(err)
                    }

                    // If successfully logged in then redirect user to Home page
                    return res.redirect('/')
                })
            })(req, res, next)
        },

        register(req, res) {
            res.render('register')
        },
        async postRegister(req, res) {
            const { username, email, password } = req.body
                //console.log(req.body)

            // request validation
            if (!username || !email || !password) {
                req.flash('error', 'All fields need to be filled')
                    // if any error comes up do not erase given data
                req.flash('username', username)
                req.flash('email', email)
                return res.redirect('/register')
            }

            // Check if email exists already in database then through error
            User.exists({ email: email }, (err, result) => {
                if (result) {
                    req.flash('error', 'Email already exist')
                    req.flash('username', username)
                    req.flash('email', email)
                    return res.redirect('/register')

                }

            })

            //saltRounds = 10;
            /* 'await' can be put in front of any async promise-based function to pause our 
              code on that line until the promise fulfills, then return the resulting value.*/
            const hashedPassword = await bcrypt.hash(password, 10)
                //create a new user 
            const user = new User({
                username: username,
                email: email,
                password: hashedPassword

            })

            // Save user on database and redirect 
            user.save().then((user) => {
                // Login
                return res.redirect('/login')
            }).catch(err => {
                req.flash('error', 'Something went wrong')
                return res.redirect('/register')


            })
        },

        logout(req, res) {
            req.logout()
            return res.redirect('/login')
        }
    }
}


module.exports = userController