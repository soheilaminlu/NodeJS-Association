const express = require('express');
const router = express.Router()

const {isAdmin} = require('../../middlewares/authentication/isAdmin');
const {isAuth} = require('../../middlewares/authentication/isAuth')
const {isCurrentUser} = require('../../middlewares/authentication/isCurrentUser')

const { viewAllUsers , viewUserDetails , createGroup , viewAllGroups ,updateOwner, updateUserRole ,deleteGroup , viewGroupDetails} = require('../../controllers/admin/admincontrollers');

//----GET REQUESTS
router.get('/users',isAuth, isAdmin, isCurrentUser, viewAllUsers);

router.get('/user/:userId', isAuth,  isAdmin, isCurrentUser,viewUserDetails);
router.get('/group/:groupId' , isAuth, isAdmin, viewGroupDetails);
router.get('/groups', isAuth, isAdmin  , isCurrentUser,viewAllGroups);

// //POST REQUESTS
router.post('/create-group',isAuth, isAdmin,createGroup );
// //---PUT OR DELETE REQUESTS
router.put('/groups/:groupId/update-owner',isAuth , isAdmin ,updateOwner);
router.put('/update-role/:userId', isAuth,  isAdmin ,updateUserRole);
 router.delete('/delete-group/:groupId', isAuth ,  isAdmin , deleteGroup)





module.exports = router