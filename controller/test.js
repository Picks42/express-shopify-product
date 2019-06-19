const M_Bank = require('../models/user');
exports.getTest = function(req,res){
    return M_Bank.User
    .findAll()
    .then(M_Bank => res.status(200).send(M_Bank))
    .catch((error) => {
      console.log(error.toString());
      res.status(400).send(error)
    });
    exports.index = function (request, response, next) {
        res.json((models.user.findAll()));
    };
};