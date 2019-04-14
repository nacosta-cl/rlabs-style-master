'use strict';
module.exports = (sequelize, DataTypes) => {
  const mood = sequelize.define('mood', {
    status: DataTypes.INTEGER
  }, {});
  mood.associate = function(models) {
    // associations can be defined here
  };
  return mood;
};