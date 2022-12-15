import News from "../models/News.js";

const createService = (body) => {
    return News.create(body);
}

const findAllService = (offset, limit) => {
    return News.find().sort({_id: -1}).skip(offset).limit(limit).populate("user");
}

const countNews = () => {
    return News.countDocuments();
}

const topNewsService = () => {
    return News.findOne().sort({_id: -1}).populate("user")
}

const findByIdService = (id) => {
    return News.findById(id).populate("user")
}
export default { createService, findAllService, countNews, topNewsService, findByIdService }