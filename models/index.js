var Sequelize = require('sequelize');
var db = require('./db');
var Page = require('./Page');
var User = require('./User');

Page.belongsTo(User, {as: 'author'});


module.exports = {db, User, Page};
