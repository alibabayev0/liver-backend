const express = require('express');
const validate = require('../../middlewares/validate');
const { authValidation,oAuthValidation } = require('../../validations');
const { authController } = require('../../controllers');
const oAuth = require('../../middlewares/oauth').oAuth;

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);

router.post('/google', validate(authValidation.oAuth), oAuth('google'), authController.oAuth);
router.post('/facebook', validate(authValidation.oAuth), oAuth('facebook'), authController.oAuth);

router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);

module.exports = router;
