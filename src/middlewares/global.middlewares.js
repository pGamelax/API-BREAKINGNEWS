import mongoose from 'mongoose';
import userService from '../services/user.service.js'

export const isValidId = (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid ID' })
    }

    req.id = id
    next()
}

export const isValidUser = async (req, res, next) => {
    const id = req.params.id;

    const user = await userService.findByIdService(id);

    if (!user === 0 || user === null || typeof user === undefined) {
        return res.status(400).send({ message: 'User not found' });
    };

    req.id = id;
    req.user = user;

    next()
}


