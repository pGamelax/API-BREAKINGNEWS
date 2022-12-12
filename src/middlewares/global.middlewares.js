const mongoose = require('mongoose');
const userService = require('../services/user.service')

const isValidId = (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid ID' })
    }

    next()
}

const isValidUser = async (req, res, next) => {
    const id = req.params.id;

    const user = await userService.findByIdService(id);

    if (!user === 0 || user === null || typeof user === undefined) {
        return res.status(400).send({ message: 'User not found' });
    };

    req.id = id;
    req.user = user;
    
    next()
}

module.exports = { isValidId, isValidUser}