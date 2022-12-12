const route = require('express').Router();
const userController = require('../controllers/user.controller');
const {isValidId, isValidUser} = require("../middlewares/global.middlewares")

route.post('/', userController.create);
route.get('/', userController.findAll);
route.get('/:id', isValidId, isValidUser, userController.findById);
route.patch('/:id', isValidId, isValidUser, userController.update);
route.delete('/:id', isValidId, isValidUser, userController.deleteOne);

module.exports = route