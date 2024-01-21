const express = require('express');
const router = express.Router()
const {isAuth} = require('../../middlewares/authentication/isAuth');
const {isGroupOwner} = require("../../middlewares/authentication/isGroupOwner")
const {listJoinRequests , processJoinRequest} = require('../../controllers/users/OwnerController')

// //-----GET REQUESTS
router.get('/join-requests/:groupId', isAuth, isGroupOwner ,listJoinRequests);
// //-----POST REQUESTS
router.post('/process-join-request/:requestId/:action', isAuth, isGroupOwner ,processJoinRequest);
// router.post('/remove-member/:groupId/:memberId', isAuth , removeMember);
// //-----PUT REQUESTS
// router.put('/update-member/:groupId/:memberId' , isAuth , UpdateMember);

module.exports = router