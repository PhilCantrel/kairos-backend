import Goal from '../models/goals.mjs'

const getUserGoals = function (req) {
    return Goal.find()
}

export {getUserGoals}