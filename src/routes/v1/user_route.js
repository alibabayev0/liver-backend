const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { userController } = require('../../controllers');
const { userValidation } = require('../../validations');

const router = express.Router();

router
  .route('/')
  .get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers)
  .post(auth('manageUsers'), validate(userValidation.createUser), userController.createUser);

router
  .route('/:userId')
  .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
  .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
  .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;