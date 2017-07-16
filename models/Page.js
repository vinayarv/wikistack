/*
field	description
title	the page's title
urlTitle	a url-safe version of the page title, for links
content	the page content
status	if the page is open or closed*/
var Sequelize = require('sequelize');
var db = require('./db');

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
},
{
  getterMethods: {
    route: () => {
      return '/wiki/' + this.urlTitle;
    }
  },
  hooks: {
    beforeValidate: () => {
      let title = this.getDataValue('title');
      title = title ? title.replace('/\s/g', '_').replace('/\W/g', '')
                    : Math.random().toString(36).substring(2, 7);
      this.setDataValue('urlTitle',  title);
    }
  }
}

);

module.exports = Page;
