const userService = require('../services/user.service');
const mongoose = require('mongoose');

const create = async (req, res) => {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name || !username || !email || !password || !avatar || !background) {
        return res.status(400).send({ message: "Submit all fields for registration" })
    }

    const usersFind = await userService.findAllService();

    for (i = 0; i < usersFind.length; i++) {
        if (usersFind[i].email == email) {
            return res.status(400).send({ message: "E-mail already registered" })
        }
    }

    const user = await userService.createService(req.body);

    if (!user) {
        return res.status(400).send({ message: 'Error creating User' });
    }
    res.status(201).send({
        message: "User created sucessfully",

        user: {
            id: user._id,
            name,
            username,
            email,
            avatar,
            background
        }
    });
}

const findAll = async (req, res) => {
    const users = await userService.findAllService();

    if (!users.length === 0) {
        return res.status(400).send({ message: 'There are not registered users' })
    }

    res.send(users)
}

const findById = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid ID' })
    }

    const user = await userService.findByIdService(id);

    if (!user === 0) {
        return res.status(400).send({ message: 'User not found' })
    }

    res.send(user)
}

const update = async (req, res) => {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name && !username && !email && !password && !avatar && !background) {
        return res.status(400).send({ message: "Submit at least one fields for update" });
    }

    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid ID' })
    }

    const user = await userService.findByIdService(id);

    if (!user === 0) {
        return res.status(400).send({ message: 'User not found' })
    }

    await userService.updateService(
        id,
        name, 
        username, 
        email, 
        password, 
        avatar, 
        background
    )

    res.send({message: "User sucessfuly updated"})
}

const deleteOne = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid ID' });
    };

    const user = await userService.findByIdService(id);

    if (!user === 0) {
        return res.status(400).send({ message: 'User not found' });
    };

    await userService.deleteOneService(id);

    res.send({message: "User deleted sucessfuly"});

}
module.exports = {
    create,
    findAll,
    findById,
    update,
    deleteOne
};