const express = require('express');
const router = express.Router()
const {isAuth} = require('../../middlewares/authentication/isAuth');
const {joinGroupRequest , sendMessage , leaveGroup , viewGroupMembers , myProfile , updateProfile} = require('../../controllers/users/MembersController') 

//----POST REQUESTS
router.post('/join-group/:groupId' ,isAuth  ,joinGroupRequest);
router.post('/send-message/:groupId/:receiverId' , isAuth, sendMessage);
router.post('/leave-group/:groupId' ,isAuth , leaveGroup);
// //----GET REQUESTS
router.get('/group-members/:groupId', isAuth,  viewGroupMembers);
 router.get('/my-profile', isAuth, myProfile);
// //-----PUT REQUESTS
router.put('/update-profile', isAuth, updateProfile);






module.exports = router