const express = require("express");
const validate = require("../../middlewares/validate");
const userController = require("../../controllers/user_controller");
const userValidation = require("../../validation/user_validation");

const router = express.Router();

router
  .route('/')
  .get(validate(userValidation.getUsers), userController.findAll)
  .post(validate(userValidation.createUser), userController.create);

router
  .route('/:userId')
  .get(validate(userValidation.getUser), userController.findOne)
  .patch(validate(userValidation.updateUser), userController.updateUser)
  .delete(validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;