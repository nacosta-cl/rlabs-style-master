'use strict';
module.exports = (sequelize, DataTypes) => {
  const prob = sequelize.define('prob', {
    sucursalID: DataTypes.INTEGER,
    alive: DataTypes.BOOLEAN,
    available: DataTypes.BOOLEAN,
    type: DataTypes.STRING,
    activeMainSKU: DataTypes.STRING,
  }, {});
  prob.associate = function(models) {
    // associations can be defined here
  };
  return prob;
};