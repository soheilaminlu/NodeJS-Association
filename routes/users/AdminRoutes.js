const express = require('express');
const router = express.Router()

const {isAdmin} = require('../../middlewares/authentication/isAdmin');
const {isAuth} = require('../../middlewares/authentication/isAuth')

const { viewAllUsers , viewUserDetails , createGroup , viewAllGroups ,updateOwner, updateUserRole ,deleteGroup } = require('../../controllers/admin/admincontrollers');

//----GET REQUESTS
router.get('/users',viewAllUsers);

router.get('/user/:userId', viewUserDetails);
router.get('/groups', viewAllGroups);

// //POST REQUESTS
router.post('/create-group', createGroup );
// //---PUT OR DELETE REQUESTS
router.put('/groups/:groupId/update-owner', updateOwner);
router.put('/update-role/:userId', updateUserRole);
 router.delete('/delete-group/:groupId' , deleteGroup)





module.exports = router