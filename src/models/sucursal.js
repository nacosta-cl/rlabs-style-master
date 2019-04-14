'use strict';
module.exports = (sequelize, DataTypes) => {
  const sucursal = sequelize.define('sucursal', {
    name: DataTypes.STRING,
    region: DataTypes.STRING,
    address: DataTypes.STRING,
    mapSrc: DataTypes.STRING
  }, {});
  sucursal.associate = function(models) {
    // associations can be defined here
  };
  return sucursal;
};