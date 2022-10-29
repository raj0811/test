const express = require('express');
const router = express.Router();
const passport = require('passport');

// import controller
const usersController = require('../controllers/users_controller');

router.get('/sign-up', passport.checkAuthentication ,usersController.signup);
router.get('/sign-in', usersController.signin);
router.get('/profile',usersController.profile);
// create account 
router.post('/create',usersController.create);

router.post('/create-session',passport.authenticate(
    'local',{ failureRedirect: '/users/sign-in' }
) ,usersController.createSession);


// router.post('/create-session', passport.authenticate(
//     'local', { failureRedirect: '/user/sign-in' }
// ), usersController.createSession);

module.exports = router;