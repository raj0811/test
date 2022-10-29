const User = require("../models/user");
const path = require('path');

module.exports.profile = function(req, res){
   


    User.findById(req.params.id, function (err, user) {

        return res.render('profile', {
            title: "user profile",
            profile_user: user
        });
    });
    
}

// Render signup page
module.exports.signup= function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: 'Sign up'
    })
}

// render signin page here

module.exports.signin= function(req, res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title: 'Sign in'
    })
}


module.exports.create = function(req,res){
    if(req.body.password != req.body.repassword){
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function(err, user){
        if(err){
            console.log("Error in finding user in siging up",err);
             return;
        }
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log("Error in creating user");
                    return;
                }
                return res.redirect('/users/sign-in')
            })
        }else{
            return res.redirect('back');
        }
    })
}

// sign in create sessipn

module.exports.createSession = function(req,res){
        return res.redirect('/users/profile');
}