import User from '../models/User.js'

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
    return User.findOneAndUpdate({ _id: id }, { name, username, email, password, avatar, background });
}

const deleteOneService = (id) => {
    return User.deleteOne({ _id: id })
}

export default {
    createService,
    findAllService,
    findByIdService,
    updateService,
    deleteOneService,
}