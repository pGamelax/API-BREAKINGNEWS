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
export default { createService, findAllService, countNews, topNewsService, findByIdService, searchByTitleService, searchByUserService, updateService, eraseService }