        const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var User = require('../models/user.model');

exports.create = (req,res) =>{
    res.send({status:'NOT_IMPLEMENTED:USER_LIST'});
}

exports.findAll = (req, res) => {
    res.send({status:'NOT_IMPLEMENTED:USER_LIST'});
};

exports.findOne = (req, res) => {
    res.send('NOT IMPLEMENTED: user create GET');
};

exports.updateUser = (req, res) => {
    res.send('NOT IMPLEMENTED: user create POST');
};

exports.delete = (req, res) => {
    res.send('NOT IMPLEMENTED: user delete GET');
};