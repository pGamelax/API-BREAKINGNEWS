const User = require('../models/User')

const createService = (body) => {
    return User.create(body);
}

const findAllService = () => {
    return User.find();
}

const findByIdService = (id) => {
    return User.findById(id);
} 
module.exports = {
    createService,
    findAllService,
    findByIdService,
}