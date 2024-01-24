const express = require('express');
const router = express.Router()
const {isAuth} = require('../../middlewares/authentication/isAuth');
const {isGroupOwner} = require("../../middlewares/authentication/isGroupOwner")
const {isCurrentUser} = require('../../middlewares/authentication/isCurrentUser')
const {listJoinRequests , processJoinRequest , removeMember , addMember} = require('../../controllers/users/OwnerController')

// //-----GET REQUESTS
router.get('/join-requests/:groupId', isAuth ,isGroupOwner, isCurrentUser   ,listJoinRequests);
// //-----POST REQUESTS
router.post('/process-join-request/:requestId/:action', isAuth ,  isGroupOwner , processJoinRequest);
router.post('/remove-member/:groupId/:memberId', isAuth , isGroupOwner ,removeMember);
router.post('/add-member/:groupId/:memberId' , isAuth , isGroupOwner ,  addMember)

module.exports = router