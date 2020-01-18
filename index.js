const   mongoose        =require("mongoose"),
        express         =require("express"),
        app             =express(),
        passport        =require("passport"),
        localStrategy   =require("passport-local"),
        expressSession  =require("express-session"),
        User            =require("./models/userModel")
        bodyParser      =require('body-parser');

//routes
const  indexRoutes=require("./routes/indexRoutes"),
       adminRoutes=require("./routes/adminRoutes"),
       blogRoutes =require("./routes/blogRoutes");




//app config
mongoose.connect("mongodb://localhost/blogApp");
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

//passport config
app.use(require("express-session")({
    secret:"bu bizim guvenlik cumlemizdir",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Share current user info within all routes
app.use( (req,res,next)=>{
    res.locals.currentUser=req.user;
    next();
});



//routes using
app.use(indexRoutes);
app.use(adminRoutes);
app.use(blogRoutes);

const server = app.listen(4000,function(err){
    if(err){
        console.log(err);
    }
    console.log("server started %d", server.address().port);
})


