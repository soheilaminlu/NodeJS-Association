const express = require('express')
const router = express.Router();
const {isLoggedIn} = require('../../middlewares/authentication/isLoggedIn')


// IMPORT CRUD FUNCTION NAME
const {signupUser , loginUser , logoutUser , } = require('../../controllers/users/AuthController')

router.post('/signup' , signupUser)
router.post('/login' , loginUser)
router.get('/logout' , logoutUser)




module.exports = router