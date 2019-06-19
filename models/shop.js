'use strict';
module.exports = (sequelize, DataTypes) => {
  var Shop =  ('Shop', {
    shop: DataTypes.STRING,
    token: DataTypes.STRING,
    guid: DataTypes.STRING,
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