var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    db = require("./models"),
    methodOverride = require("method-override"),
    session = require("cookie-session"),
    morgan = require("morgan"),
    loginMiddleware = require("./middleware/loginHelper"),
    routeMiddleware = require("./middleware/routeHelper"),
    bcrypt = require("bcrypt"),
    SALT_WORK_FACTOR = 10;

app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
  maxAge: 3600000,
  secret: 'illnevertell',
  name: "chocolate chip"
}));

app.use(loginMiddleware);

//************************ USER ************************//

app.get('/', routeMiddleware.ensureLoggedIn, function(req,res){
  res.redirect('/users');
});

app.get('/signup', function (req,res){
  res.render('users/signup');
});

app.post("/signup", function (req, res) {
  var newUser = req.body.user;
  db.User.create(newUser, function (err, user) {
    if (user) {
      req.login(user);
      res.redirect("/users");
    } else {
      console.log(err);
      // TODO - handle errors in ejs!
      res.render("/signup");
    }
  });
});

app.get("/login", function (req, res) {
  res.render("users/login");
});

app.post("/login", function (req, res) {
	//console.log(req.body.user);
  db.User.authenticate(req.body.user,
  function (err, user) {
  	console.log(user, "USER")
    if (!err && user !== null) {
      req.login(user);
      res.redirect("/users");
    } else {
      // TODO - handle errors in ejs!
      res.render("users/login");
    }
  });
});


app.get("/users/:id", function(req,res){
    db.User.findById(req.params.id, function(err, user){
    if(err){
      res.render("errors/404");
    } else {
      res.render('users/show', {user:user});
    }
  })
});

app.get("/users/:id/edit", function(req,res){
  db.User.findById(req.params.id, function(err, user){
    if(err){
      res.render("errors/404");
    } else {
      res.render('users/edit', {user:user});
    }
  })
});

app.put("/users/:id", function(req, res) {
  db.User.findByIdAndUpdate(req.params.id, req.body.user,  function(err, user){
    if(err){
      res.render("404");
    } else{
      res.redirect('/users');
    }
 })
});

app.delete("/users/:id", function(req, res) {
  db.User.findByIdAndRemove(req.params.id, function(err, user){
    if(err){
      res.render("404");
    } else{
      res.redirect('/users');
    }
  })
})

app.get("/users", routeMiddleware.ensureLoggedIn, function(req, res) {
  db.User.findById(req.session.id,function(err,user){
      db.User.find({}, function(err, users){
        if(err){
          res.render("errors/404");
        } else {
          res.render('users/index', {users:users, user:user});
        }
      })    
  })
}); 

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/login");
});

app.get('*', function(req,res){
  res.render('errors/404');
});

app.listen(3000, function(){
  console.log("Server is listening on port 3000");
});
