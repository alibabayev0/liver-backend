const axios = require('axios');
const ApiError = require('../utils/api_error');
const httpStatus = require('http-status');
const Joi = require("joi");
const { oAuthValidation } = require("../validations")

const facebook = async (access_token) => {
  const fields = 'id, name, email, picture';
  const url = 'https://graph.facebook.com/me';
  const params = { access_token, fields };
  const response = await axios.get(url, { params });
  var { id, name, email, picture } = response.data;
  picture = { 
    url: picture.data.url,
    height: picture.data.height,
    width: picture.data.width
  }; 
  const result = oAuthValidation.oAuthFacebook.validate({id,name,email,picture});
  if(result.error){
    throw new ApiError(httpStatus.BAD_REQUEST,`In facebook account, ${result.error.details[0].message}`);
  }
  return {
    service: 'facebook',
    picture: picture,
    id,
    name,
    email,
  };
};

const google = async (access_token) => {
  const url = 'https://www.googleapis.com/oauth2/v3/userinfo';
  const params = { access_token };
  const response = await axios.get(url, { params });
  const { sub, name, email, picture } = response.data;
  const result = oAuthValidation.oAuthGoogle.validate({sub,name,email,picture});
  if(result.error){
    throw new ApiError(httpStatus.BAD_REQUEST,`In google account, ${result.error.details[0].message}`);
  }
  return {
    service: 'google',
    picture,
    id: sub,
    name,
    email,
  };
};

module.exports = {
  facebook,
  google,
};
