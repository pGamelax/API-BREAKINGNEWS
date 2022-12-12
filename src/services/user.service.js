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

const updateService = (id, name, username, email, password, avatar, background) => {
    return User.findOneAndUpdate({_id:id}, {name, username, email, password, avatar, background});
}
module.exports = {
    createService,
    findAllService,
    findByIdService,
    updateService,
};