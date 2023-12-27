const express = require('express');
const router = express.Router()
const {isAuth} = require('../../middlewares/authentication/isAuth');

//----GET REQUESTS
router.get('/users' , isAuth , viewAllUsers);
router.get('/user/:userId' , isAuth , viewUserDetails);
router.get('/groups', isAuth, viewAllGroups);

//POST REQUESTS
router.post('/create-group' , isAuth , createGroup );
//---PUT OR DELETE REQUESTS
router.put('/edit-owner/:groupId/:ownerId' , isAuth , updateOwnerOfGroup);
router.put('/update-user-role/:userId/:newRole', isAuth, updateUserRole);
router.delete('/delete-group/:groupId' , isAuth , deleteGroup)





module.exports = router