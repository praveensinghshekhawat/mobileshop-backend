// const express = require('express');
// const router = express.Router();

// router.get('/', (req, res) => {
//   res.send('✅ User route working!');
// });

// module.exports = router; // ✅ Must be a router

const express = require('express');
const router = express.Router();
const { getUsers, addUsers, deleteUser } = require('../controllers/userController');


router.get('/getUsers', getUsers);
router.post('/addUsers', addUsers);
router.post('/deleteUser', deleteUser);



module.exports = router;