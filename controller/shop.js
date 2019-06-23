const models = require("../models");
const shopModel = models.Shop;
exports.saveShop = function(shopDetail, token) {
  return new Promise((resolve, reject) => {
    const shoObj = {};

    shoObj.token = token;
    shoObj.shop = shopDetail.domain;
    shoObj.phone = shopDetail.phone;
    shoObj.email = shopDetail.email;
    shoObj.owner = shopDetail.shop_owner;

    try {
      shopModel
        .findOrCreate({ where: { shop: shoObj.shop }, defaults: shoObj })
        .then(([shopData, created]) => {
          console.log(created);
          if (created) {
            resolve(shopData);
          }
          resolve("You are already registerd");
        })
        .catch(function(err) {
          // print the error details
          reject(err.toString());
        });
    } catch (error) {
      throw Error(error);
    }
  });
};
exports.checkShop = async function(shopName) {
  try {
    var rs = await shopModel.findOne({ where: { shop: shopName } });
    if (rs) {
      return rs;
    } else {
      return false;
    }
  } catch (e) {
    throw Error(e);
  }
};
