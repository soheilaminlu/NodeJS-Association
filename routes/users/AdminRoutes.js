const express = require('express');
const router = express.Router()

const {isAdmin} = require('../../middlewares/authentication/isAdmin');
const {isAuth} = require('../../middlewares/authentication/isAuth')

const { viewAllUsers , viewUserDetails , createGroup , viewAllGroups ,updateOwner, updateUserRole ,deleteGroup } = require('../../controllers/admin/admincontrollers');

//----GET REQUESTS
router.get('/users',isAuth,viewAllUsers);

router.get('/user/:userId', isAuth, viewUserDetails);
router.get('/groups', isAuth,viewAllGroups);

// //POST REQUESTS
router.post('/create-group',isAuth, createGroup );
// //---PUT OR DELETE REQUESTS
router.put('/groups/:groupId/update-owner',isAuth , updateOwner);
router.put('/update-role/:userId', isAuth,updateUserRole);
 router.delete('/delete-group/:groupId', isAuth , deleteGroup)





module.exports = router