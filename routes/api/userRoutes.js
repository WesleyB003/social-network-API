const router = require('express').Router();

const {
    getUsers,
    addUser,
    getUserByID,
    updateUser,
    deleteUser,
    addFriend,
    deleteFromFriendList  
} = require('../../controllers/userController');

router.route('/')
.get(getUsers)
.post(addUser);

router.route('/:id')
.get(getUserByID)
.put(updateUser)
.delete(deleteUser);

router.route('/:id/friends/:friendID')
.post(addFriend)
.delete(deleteFromFriendList)

module.exports = router;