const express = require('express');
const router = express.Router();
var session = require("express-session");
verifyShop = function(req,res,next){
    if(req.session.shop){
        next();
    }
    else{
        res.redirect("/login");
    }
};
router.get('/login' ,(req, res) => res.render('login'));
router.get('/', verifyShop, (req, res) => res.render('dashboard'));
router.post('/', (req, res) => require('../controller/install').getInstall(req,res));
router.get('/callback', (req, res) => require('../controller/install').getCallback(req,res));
router.get("/test",(req,res) => res.render('test'));
router.post("/test",(req,res) => require('../controller/test').getTest(req,res));
router.get('/logout',verifyShop ,(req,res)=> {
    req.session = null;
    res.redirect("/");
});
module.exports = router;