const express= require('express'),
        router=express.Router(),
        User = require("../models/userModel"),
        passport=require("passport"),
        bodyParser=require('body-parser');


let adminActions =[
    {
        actionId:1,
        actionName:"changeHomeImage",
        actionDisplayName:"Change Home Image "

    },
    {
        actionId:2,
        actionName:"changeAboutImage",
        actionDisplayName:"Change About Image "

    },
    {
        actionId:3,
        actionName:"changeAboutText",
        actionDisplayName:"Change About Text "

    },
    {
        actionId:4,
        actionName:"addNewBlog",
        actionDisplayName:"Add New Blog "

    },
    {
        actionId:5,
        actionName:"listAllBlog",
        actionDisplayName:"List All Blogs "

    },

];











router.get("/admin",isLoggedIn, function(req,res){
    res.render("admin/admin", {adminActions:adminActions});
})




router.get("/signin", function(req,res){
    res.render('admin/signin');
})

router.post("/signin", passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/signin"

}),(req,res)=>{

});


router.get("/signup",isLoggedIn, function(req,res){
    res.render('admin/signup');
})

router.post("/signup",isLoggedIn, function(req,res){
    
    let newUser= new User({username :req.body.username});
    User.register(newUser, req.body.password , (err,user)=>{
        if(err){
            console.log(err);
            res.redirect("signup");
        }
        passport.authenticate("local")(req, res , ()=>{
            res.redirect("/");
        });

    });

});


router.get("/signout", (req,res)=>{
    req.logOut();
    res.redirect("/");
} );


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/signin");
};

module.exports=router;
