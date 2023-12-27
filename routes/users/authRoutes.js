const express = require('express')
const router = express.Router();

// IMPORT CRUD FUNCTION NAME
const {signupUser , loginUser , logoutUser , getAdminPanel} = require('../../controllers/AuthController')

router.post('/signup' , signupUser)
router.post('/login' , loginUser)
router.get('/admin' , getAdminPanel);
router.get('/logout' , logoutUser)




module.exports = router