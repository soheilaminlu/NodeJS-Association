const express = require('express');
const router = express.Router()

const {isAdmin} = require('../../middlewares/authentication/isAdmin');
const {isAuth} = require('../../middlewares/authentication/isAuth')

const { viewAllUsers , viewUserDetails , createGroup , viewAllGroups ,updateOwner } = require('../../controllers/admin/admincontrollers');

//----GET REQUESTS
router.get('/users' , isAuth,isAdmin,viewAllUsers);

router.get('/user/:userId', viewUserDetails);
router.get('/groups', viewAllGroups);

// //POST REQUESTS
router.post('/create-group', createGroup );
// //---PUT OR DELETE REQUESTS
router.put('/updateowner/:groupId', updateOwner);
// router.put('/update-user-role/:userId/:newRole', isAuth, updateUserRole);
// router.delete('/delete-group/:groupId' , isAuth , deleteGroup)





module.exports = router