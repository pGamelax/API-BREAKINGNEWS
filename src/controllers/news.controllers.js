import newsService from "../services/news.service.js"

const create = async (req, res) => {
    try {
        const { title, text, banner } = req.body;

        if (!title || !text || !banner) {
            return res.status(400).send({ message: "Submit all fields for registration" });
        };

        const user = req.userId

        if (!user) {
            return res.status(400).send({ message: "Cannot get user" });
        }

        await newsService.createService({
            title,
            text,
            banner,
            user: user
        });

        res.status(201).send({
            message: "News created sucessfully",

            news: {
                title,
                text,
                banner,
                user,
            }
        });

    } catch (err) {
        res.status(500).send(({ message: err.message }))
    }
}

const findAll = async (req, res) => {
    try {
        let { limit, offset } = req.query

        limit = Number(limit)
        offset = Number(offset)

        if (!limit) {
            limit = 5;
        }

        if (!offset) {
            offset = 0;
        }

        const news = await newsService.findAllService(offset, limit);
        const total = await newsService.countNews();
        const currentUrl = req.baseUrl

        const next = offset + limit;
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset${next}` : null

        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset${next}` : null

        if (!news.length === 0) {
            return res.status(400).send({ message: 'There are no registered news' })
        }

        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,

            results: news.map(item => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                userName: item.user.username,
                userAvatar: item.user.avatar,
            }))
        });

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const topNews = async (req, res) => {
    try {
        const news = await newsService.topNewsService();

        if (!news) {
            return res.status(400).send({ message: "There is no registred post" })
        }

        res.send({

            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                userName: news.user.username,
                userAvatar: news.user.avatar,
            }
        })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const findById = async (req, res) => {
    try {

        const news = await newsService.findByIdService(req.params.id)

        res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                userName: news.user.username,
                userAvatar: news.user.avatar,
            }
        })

    } catch (err) {
        res.status(500).send({ message: err.message })
    }

}

const searchByTitle = async (req, res) => {
    try {
        const { title } = req.query

        const news = await newsService.searchByTitleService(title)

        if (news.length === 0) {
            return res.status(400).send({ message: "There are no news with this title" })
        }

        return res.send({
            results: news.map(item => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                userName: item.user.username,
                userAvatar: item.user.avatar,
            }))
        })

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const searchByUser = async (req, res) => {
    try {
        const id = req.userId

        const news = await newsService.searchByUserService(id)

        if (news.length === 0) {
            return res.status(400).send({ message: "There are no news with this title" })
        }

        return res.send({
            results: news.map(item => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                userName: item.user.username,
                userAvatar: item.user.avatar,
            }))
        })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }

}

const update = async (req, res) => {
    try {

        const { title, text, banner } = req.body
        const id = req.params.id

        if (!title && !text && !banner) {
            return res.status(400).send({ message: "Submit at least one fields for update" });
        };

        const news = await newsService.findByIdService(id);

        if (String(news.user._id) !== req.userId) {
            return res.status(400).send({
                message: "You didn't uptade this post"
            })
        }

        await newsService.updateService(id, title, text, banner)

        return res.send({ message: "Post sucessfuly updated!" })

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const erase = async (req, res) => {
    try {
        const { id } = req.params

        const news = await newsService.findByIdService(id);

        if (String(news.user._id) !== req.userId) {
            return res.status(400).send({
                message: "You didn't delete this post"
            })
        }

        await newsService.eraseService(id)

        return res.send({ message: "Post sucessfuly deleted!" })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const like = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.userId

        const newsLiked = await newsService.likeService(id, userId)

        if(!newsLiked){
            await newsService.deleteLikeService(id, userId)
            return res.status(200).send({message: "Like sucessfully removed"});
        }

        res.send({message: "Like done sucessfully"})
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}
export default { create, findAll, topNews, findById, searchByTitle, searchByUser, update, erase, like }