const express = require('express');
const router = express.Router();
router.get('/', (req, res) => res.render('login'));
router.post('/', (req, res) => require('../controller/install').getInstall(req,res));
router.get('/callback', (req, res) => require('../controller/install').getCallback(req,res));
router.get("/test",(req,res) => require("../controller/test").getTest(req,res));
module.exports = router;