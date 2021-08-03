import User from '../models/user.mjs'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import yenv from 'yenv'

const env = yenv('env.yaml', { env: 'jwt' })

const errorHandling = function(res, err, code) {
    res.status(code)
    return res.json({error: err.message})
}


const signUp = function (req, res) {
    const newUser = new User(req.body)
    newUser.hashed_password = bcrypt.hashSync(req.body.password, 10)
    newUser.createdAt = Date.now()
    newUser.editedAt = Date.now()
    newUser.avatar = 1
    newUser.save((err, user) => {
        if (err) {
            res.status(400)
            return res.json({error: err.message})
        }
        // return the email & jwt
        return res.json({jwt: jsonwebtoken.sign({email: user.email, id: user.id}, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN })})
    })
}

const signIn = function (req, res) {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) {errorHandling(res, err, 400)}
        if (!user || !user.comparePassword(req.body.password)) {
            res.status(400)
            return res.json({message: "Authentication Failed, Invalid email or password"}) 
        }
        return res.json({jwt: jsonwebtoken.sign({email: user.email, id: user.id}, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN })})
    })
}

const loginCheck = function (req, res, next) {
    if(req.user) {
        next()
    } else {
        return res.status(401).json({message: "Authorisation Failed, No or Invalid User"})
    }
}


export {signUp, signIn, loginCheck}
