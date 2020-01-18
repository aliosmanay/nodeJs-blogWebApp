const express= require('express'),
        Blog = require('../models/blogModel'),
        router=express.Router();


router.get("/addNewBlog",isLoggedIn, function(req,res){
     res.render('blog/newBlog');
})
        
router.post("/addNewBlog",isLoggedIn, function(req,res){

        let title=req.body.data.blogTitle;
        let comSentence=req.body.data.blogComSentence;
        let comImage = req.body.data.blogComImage;
        let blog= req.body.data.blog;
      


     let newBlog = {
             title:title, 
             comSentence:comSentence, 
             comImage:comImage, 
             blog:blog
        };

        console.log(newBlog);
    
        Blog.create(newBlog)
        .then((newBlog)=>{
               console.log(newBlog);
               res.status(201).json(newBlog); 
        })
        .catch((err)=>{
                console.log("=================ERROR ERROR ERROR =============");
                console.log(err);
                res.send(err);
        });
});
        
router.get("/blogs/:blogId", (req,res)=>{
        Blog.findById(req.params.blogId)
        .then((foundBlog)=>{
               res.render("blog/showBlog",{foundBlog:foundBlog}); 
        })
        .catch((err)=>{
                console.log("=====================ERROR  ERROR ERROR ==============");
                console.log(err);
                res.send(err);
        })
})

router.get("/testing", (req,res)=>{
        Blog.find()
        .then((foundBlogs)=>{
                res.json(foundBlogs);
        })
        .catch((err)=>{
                console.log(err);
                res.send(err);
        })
})
        
function isLoggedIn(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/signin");
    };
module.exports=router;