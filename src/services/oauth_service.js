const httpStatus = require('http-status');
const axios = require('axios');
const ApiError = require('../utils/api_error');
const { oAuthValidation } = require('../validations');

//Here we should use more clean code note like that but its example request...
const facebook = async (accessToken) => {
  try {
    const fields = 'id, name, email, picture';
    const url = 'https://graph.facebook.com/me';
    const params = { accessToken, fields };
    const response = await axios.get(url, { params });
    const { id, name, email } = response.data;
    const picture = {
      url: response.data.picture.data.url,
      height: response.data.picture.data.height,
      width: response.data.picture.data.width,
    };
    const result = oAuthValidation.oAuthFacebook.validate({ id, name, email, picture });
    if (result && result.error) {
      throw new Error();
    }
    return {
      service: 'facebook',
      picture,
      id,
      name,
      email,
    };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, `In facebook account, has not access`);
  }
};

//Here we should use more clean code note like that but its example request...
const google = async (accessToken) => {
  try {
    const url = 'https://www.googleapis.com/oauth2/v3/userinfo';
    const params = { accessToken };
    const response = await axios.get(url, { params });
    const { sub, name, email, picture } = response.data;
    const result = oAuthValidation.oAuthGoogle.validate({ sub, name, email, picture });
    if (result && result.error) {
      throw new Error();
    }
    return {
      service: 'google',
      picture,
      id: sub,
      name,
      email,
    };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, `In google account, has not access`);
  }
};

module.exports = {
  facebook,
  google,
};
