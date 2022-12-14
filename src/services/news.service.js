import News from "../models/News.js";

const createService = (body) => {
    return News.create(body);
}

const findAllService = (offset, limit) => {
    return News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");
}

const countNews = () => {
    return News.countDocuments();
}

const topNewsService = () => {
    return News.findOne().sort({ _id: -1 }).populate("user")
}

const findByIdService = (id) => {
    return News.findById(id).populate("user")
}

const searchByTitleService = (title) => {
    return News.find({
        title: { $regex: `${title || ""}`, $options: "i" }
    }).sort({ _id: -1 }).populate("user")
}

const searchByUserService = (id) => {
    return News.find({ user: id }).sort({ _id: -1 }).populate("user")
}

const updateService = (id, title, text, banner) => {
    return News.findOneAndUpdate({ _id: id }, { title, text, banner }, { rawResult: true })
}

const eraseService = (id) => {
    return News.findOneAndDelete({ _id: id })
}

const likeService = (idNews, userId) => {
    return News.findOneAndUpdate(
        { _id: idNews, "likes.userId": { $nin: [userId] } },
        { $push: { likes: { userId, created: new Date() } } })
}

const deleteLikeService = (idNews, userId) => {
    return News.findOneAndUpdate(
        { _id: idNews },
        { $pull: { likes: { userId } } })
}

const addCommentService = (idNews, comment, userId) => {
    const idComment = Math.floor(Date.now() * Math.random()).toString(36);

    return News.findOneAndUpdate(
        { _id: idNews },
        { $push: { comments: { idComment, userId, comment, createdAt: new Date() } } })
}

const deleteCommentService = (idNews, idComment, userId) => {
    return News.findByIdAndUpdate(
        { _id: idNews },
        { $pull: { comments: { idComment, userId } } }
    )
}

export default {
    createService,
    findAllService,
    countNews,
    topNewsService,
    findByIdService,
    searchByTitleService,
    searchByUserService,
    updateService,
    eraseService,
    likeService,
    deleteLikeService,
    addCommentService,
    deleteCommentService,
}