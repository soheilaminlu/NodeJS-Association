const express = require('express')
const router = express.Router()

router.post('/signup' , signupUser)
router.post('/login' , loginUser)
router.get('/admin' , getAdminPanel);
router.get('/logout' , logoutUser)




module.exports = router