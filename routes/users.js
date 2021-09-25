var express = require('express');
var router = express.Router();
const userController=require('../controllers/user.controller');
const userValidator=require('../middlewares/validator/user.validator');
const loginValidator=require('../middlewares/validator/login.validator');
const {guard}=require('../middlewares/guard');
const sendResetMail=require('../middlewares/services/email.service');
const resetValidator=require('../middlewares/validator/reset.validator');

router.get('/login', (req, res)=> {
  res.render('login');
});

router.get('/signup', (req, res)=> {
  res.render('signup');
});

//router.post('/login',userController.login);

router.post('/signup',userValidator,userController.signup);

router.post('/login',loginValidator,userController.login);

router.get('/dashboard',guard,(req,res)=>{
  res.render('dashboard');
})

router.get('/logout',(req,res)=>{
  req.logout();
  req.flash('success','You are now disconnected !');
  res.redirect('/');
})

//Reset password
router.get('/forgot-password',(req,res)=>{
  res.render('forgot-password');
})

router.post('/forgot-password',userController.resetPassword,sendResetMail);

router.get('/reset-password/:token',userController.resetPasswordForm);

router.post('/reset-password/:token',resetValidator,userController.postResetPassword);

router.post('/save-profile', userController.saveProfile);

module.exports = router;
