import {getUserGoals} from '../utils/goalsUtils.mjs'

const getGoals = function (req, res) {
    getUserGoals(req).exec((err, goals) => {
        if (err) {
            res.status(500)
            return res.json({err: `Error when requesting user goals: ${err}`})
        }
        res.send(goals)
    })
}

export {getGoals}