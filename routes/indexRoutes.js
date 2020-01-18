const express= require('express'),
        Blog= require("../models/blogModel"),
        router=express.Router();


// let data = [
//     {
//         postTittle:"bu bir deneme",
//         postExplain:"deneme blogu aciklamasi",
//         image:"https://images.unsplash.com/photo-1551731900-d9ccffc78761?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"

//     },
//     {
//         postTittle:"galatasaray",
//         postExplain:"galatasaray sampiyonluk yolunda",
//         image:"https://images.unsplash.com/photo-1551726195-0c4e3e49f2a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"

//     },
//     {
//         postTittle:"bu bir deneme3 ",
//         postExplain:"son test acillamasi",
//         image:"https://images.unsplash.com/photo-1551727617-e46cd5b42ce8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80"

//     },

// ];


router.get("/", function(req,res){
   Blog.find({},(err,foundBlogs)=>{
       if(err){
        console.log("=====================ERROR  ERROR ERROR ==============");
        console.log(err);
       }else{
        console.log("=====================ALL BLOGS ==============");
        console.log(foundBlogs);
        res.render("home",{foundBlogs:foundBlogs});
       }
   });
});

router.get("/about", function(req,res){
    res.render('about');
})

router.get("/contact", function(req,res){
    res.render('contact');
})

router.get("/resume", function(req,res){
    res.render('resume');
})



module.exports=router;
