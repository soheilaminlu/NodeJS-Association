const express = require('express');
const router = express.Router()
const {isAuth} = require('../../middlewares/authentication/isAuth');
const {joinGroupRequest , sendMessage , leaveGroup , viewGroupMembers , myProfile} = require('../../controllers/users/MembersController') 

//----POST REQUESTS
router.post('/join-group/:groupId' ,  joinGroupRequest);
router.post('/send-message/:groupId/:receiverId' , sendMessage);
router.post('/leave-group/:groupId'  , leaveGroup);
// //----GET REQUESTS
router.get('/group-members/:groupId', viewGroupMembers);
 router.get('/my-profile', myProfile);
// //-----PUT REQUESTS
// router.put('/update-profile', isAuth, updateProfile);






module.exports = router