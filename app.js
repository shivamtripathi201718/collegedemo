var express = require("express");
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const app = express();

const expressSanitizer = require("express-sanitizer");
 
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));






app.get("/",(req,res) => {
    res.render("index")
})

app.get("/about",(req,res) => {
    res.render("about")
})
app.get("/campus",(req,res) => {
    res.render("campus")
})




// app.get("/blogs", function(req, res){

//     Blog.find({}, function(err, blogs){
//         if(err){
//             console.log(err);
//         } else {
            
//             res.render("blogs", {blogs: blogs}); 
//         }
//     })
// });
app.get("/blogs/new",(req,res) => {
    res.render("new");
})
app.post("/blogs", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
   var formData = req.body.blog;
   Blog.create(formData, function(err, newBlog){
       console.log(newBlog);
      if(err){
          res.render("new");
      } else {
          res.redirect("/blogs");
      }
   });
});

app.get("/blogs/:id",(req,res) => {
   Blog.findById(req.params.id, function(err, blog){
      if(err){
          res.redirect("/");
      } else {
          res.render("show", {blog: blog});
      }
   });
})



app.get("/coachings", function(req, res){

    Coaching.find({}, function(err, coaching){
        if(err){
            console.log(err);
        } else {
            
            res.render("coachings", {coaching: coaching}); 
        }
    })
});
app.get("/coachings/new",(req,res) => {
    res.render("newcoachings");
})
app.post("/coachings", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
   var formData = req.body.blog;
   Coaching.create(formData, function(err, newBlog){
       console.log(newBlog);
      if(err){
          res.render("newcoachings");
      } else {
          res.redirect("/coachings");
      }
   });
});

app.get("/coachings/:id",(req,res) => {
   Coaching.findById(req.params.id, function(err, coaching){
      if(err){
          res.redirect("/");
      } else {
          console.log("HIjda");
          console.log(coaching);
          res.render("showcoachings", {coaching: coaching});
      }
   });
})

app.listen(8080,()=>{
    console.log("started");
})