const express = require('express');
const router = express.Router()
const {isAuth} = require('../../middlewares/authentication/isAuth');
const {isCurrentUser} = require('../../middlewares/authentication/isCurrentUser')
const {joinGroupRequest , sendMessage , leaveGroup , viewGroupMembers , myProfile , updateProfile} = require('../../controllers/users/MembersController') 

//----POST REQUESTS
router.post('/join-group/:groupId' ,isAuth  ,joinGroupRequest);
router.post('/send-message/:groupId/:recieverId' , isAuth, sendMessage);
router.post('/leave-group/:groupId' ,isAuth , leaveGroup);
// //----GET REQUESTS
router.get('/group-members/:groupId', isAuth , isCurrentUser,viewGroupMembers);
 router.get('/my-profile', isAuth, isCurrentUser,myProfile);
// //-----PUT REQUESTS
router.put('/update-profile/:userId', isAuth, updateProfile);






module.exports = router