const Joi = require('joi');

const oAuthGoogle = Joi.object().keys({
    sub: Joi.string().required(),
    name: Joi.string().required(),
    picture: Joi.string().required()
});

const oAuthFacebook = Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    picture: {
        height: Joi.number().required(),
        width: Joi.number().required(),
        url: Joi.string().required(),
    }
});

const oAuthYahoo = Joi.object().keys({

});

const oAuthLinkedin = Joi.object().keys({

});

module.exports = {
    oAuthFacebook,
    oAuthGoogle,
}
