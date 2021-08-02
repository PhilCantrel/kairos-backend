import User from '../models/user.mjs'
import bcrypt from 'bcrypt'

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
        return res.json(user)
    })
}

export {signUp}
