const models = require("../models");
const userModel = models.User;

exports.getTest = async function(req, res) {
  try {
    userModel
      .findOrCreate({where:{email:req.body.email},defaults:req.body})
      .then(([user, created]) => {
        console.log(created);
        if(created){
          res.send(user.dataValues);
        }
        res.send("You are already registerd");
      })
      .catch(function(err) {
        // print the error details
        res.send(err);
    });
  } catch (err) {
    console.log(err.toString());
    return res.status(400).send(err);
  }
};
