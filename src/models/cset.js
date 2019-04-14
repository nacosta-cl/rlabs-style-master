'use strict';
module.exports = (sequelize, DataTypes) => {
  const cset = sequelize.define('cset', {
    components: DataTypes.STRING,
    creator: DataTypes.INTEGER,
    prob: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {});
  cset.associate = function(models) {
    // associations can be defined here
  };
  return cset;
};