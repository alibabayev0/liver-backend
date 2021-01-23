const axios = require('axios');
const httpStatus = require('http-status');
const ApiError = require('../utils/api_error');
const { oAuthValidation } = require('../validations');

const facebook = async (accessToken) => {
  const fields = 'id, name, email, picture';
  const url = 'https://graph.facebook.com/me';
  const params = { access_token, fields };
  const response = await axios.get(url, { params });
  const { id, name, email } = response.data;
  const picture = {
    url: response.data.picture.data.url,
    height: response.data.picture.data.height,
    width: response.data.picture.data.width,
  };
  const result = oAuthValidation.oAuthFacebook.validate({ id, name, email, picture });
  if (result.error) {
    throw new ApiError(httpStatus.BAD_REQUEST, `In facebook account, ${result.error.details[0].message}`);
  }
  return {
    service: 'facebook',
    picture,
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
  const result = oAuthValidation.oAuthGoogle.validate({ sub, name, email, picture });
  if (result.error) {
    throw new ApiError(httpStatus.BAD_REQUEST, `In google account, ${result.error.details[0].message}`);
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
