const express = require('express');
const router = express.Router();
const login=require('../login')
const rankingController= require('../controller/rankingController')
const auth=require('../middleware/auth.middleware')



router.post('/login',login.login)
router.post('/create',auth.authenticate,rankingController.create)
router.get('/getRank',auth.authenticate,rankingController.getRank)


module.exports = router;