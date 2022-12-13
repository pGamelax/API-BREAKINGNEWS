import News from "../models/News.js";

const createService = (body) => {
    return News.create(body);
}

const findAllService = () => {
    return News.find();
}

export default { createService, findAllService }