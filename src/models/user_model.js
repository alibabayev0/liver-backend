const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { uuid } = require('uuidv4');
const joi = require('joi');
const toJSON = require('./plugins/toJSON_plugin');
const paginate = require('./plugins/paginate_plugin');
const { roles } = require('../config/roles');
const validate = require('../middlewares/validate');
const { oAuthValidation } = require('../validations');

const { Schema } = mongoose;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      // required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    services: {
      google: String,
      facebook: String,
      twitter: String,
      linkedin: String,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    picture: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.statics.oAuthLogin = async function ({ service, id, email, name, picture }) {
  const user = await this.findOne({ $or: [{ [`services.${service}`]: id }, { email }] });
  if (user) {
    user.services[service] = id;
    if (!user.name) user.name = name;
    if (!user.picture) user.picture = picture;
    return user.save();
  }
  const password = uuid();
  return this.create({
    services: { [service]: id },
    email,
    password,
    name,
    picture,
  });
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
