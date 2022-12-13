import newsService from "../services/news.service.js"

const create = async (req, res) => {
    try {
        const { title, text, banner } = req.body;

        if (!title || !text || !banner) {
            return res.status(400).send({ message: "Submit all fields for registration" });
        };

        await newsService.createService({
            title,
            text,
            banner,
            id: "objetidfake"
        });

        res.send(201);
        
    } catch (err) {
        res.status(500).send(({ message: err.message }))
    }
}

const findAll = async (req, res) => {
    try {
        const news = await newsService.findAllService();

        if (!news.length === 0) {
            return res.status(400).send({ message: 'There are not registered news' })
        }

        res.send(news);

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

export default { create, findAll }