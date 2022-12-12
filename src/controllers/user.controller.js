import userService from '../services/user.service.js'

const create = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body;

        if (!name || !username || !email || !password || !avatar || !background) {
            return res.status(400).send({ message: "Submit all fields for registration" });
        };

        const usersFind = await userService.findAllService();

        let i = 0;
        
        for (i = 0; i < usersFind.length; i++) {
            if (usersFind[i].email == email) {
                return res.status(400).send({ message: "E-mail already registered" });
            };
        };

        const user = await userService.createService(req.body);

        if (!user) {
            return res.status(400).send({ message: 'Error creating User' });
        };

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
    } catch (err) {
        res.status(500).send(({ message: err.message }))
    }
}

const findAll = async (req, res) => {
    try {
        const users = await userService.findAllService();

        if (!users.length === 0) {
            return res.status(400).send({ message: 'There are not registered users' })
        }

        res.send(users);
    } catch (err) {
        res.status(500).send({ message: err.message });
    };
};

const findById = async (req, res) => {
    try {
        const user = req.user
        res.send(user);
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const update = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body;

        if (!name && !username && !email && !password && !avatar && !background) {
            return res.status(400).send({ message: "Submit at least one fields for update" });
        };

        const { id, user } = req;

        await userService.updateService(
            id,
            name,
            username,
            email,
            password,
            avatar,
            background
        );

        res.send({ message: "User sucessfuly updated" });
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

export default { create, findAll, findById, update };