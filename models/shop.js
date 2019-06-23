'use strict';
module.exports = (sequelize, DataTypes) => {
  var Shop =  sequelize.define('Shop', {
    shop: DataTypes.STRING,
    token: DataTypes.STRING,
    plan: DataTypes.STRING,
    status: DataTypes.STRING,
    email: DataTypes.STRING,
    owner: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {});
  Shop.associate = function(models) {
    // associations can be defined here
  };
  return Shop;
};