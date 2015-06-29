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

app.use(session ({
  maxAge: 3600000,
  secret: 'illnevertell',
  name: "chocolate chip"
}));

app.use(loginMiddleware);

//************************ USER ************************//

app.get('/', routeMiddleware.ensureLoggedIn, function (req,res){
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
      res.redirect("/restaurants");
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
      res.redirect("/restaurants/");
    } else {
      // TODO - handle errors in ejs!
      res.render("users/login");
    }
  });
});


app.get("/users/:id", function (req,res){
    db.User.findById(req.params.id, function (err, user){
    if(err){
      res.render("errors/404");
    } else {
      res.render('users/show', {user:user});
    }
  })
});

app.get("/users/:id/edit", function (req,res){
  db.User.findById(req.params.id, function (err, user){
    if(err){
      res.render("errors/404");
    } else {
      res.render('users/edit', {user:user});
    }
  })
});

app.put("/users/:id", function (req, res) {
  db.User.findByIdAndUpdate(req.params.id, req.body.user,  function (err, user){
    if(err){
      res.render("404");
    } else{
      res.redirect('/users');
    }
 })
});

app.delete("/users/:id", function (req, res) {
  db.User.findByIdAndRemove(req.params.id, function (err, user){
    if(err){
      res.render("404");
    } else{
      res.redirect('/users');
    }
  })
})

app.get("/users", routeMiddleware.ensureLoggedIn, function (req, res) {
  db.User.findById(req.session.id,function (err,user){
      db.User.find({}, function (err, users){
        if(err){
          res.render("errors/404");
        } else {
          res.render('users/index', {users:users, user:user});
        }
      })    
  })
}); 

//************************ RESTAURANTS ************************//

app.get("/restaurants/database", function (req, res) {
  db.Restaurant.find({}).populate("user").exec(function (err, restaurants) {
    console.log (restaurants)
    res.send(restaurants)
  })
})

app.get('/restaurants/new', function (req,res){
  res.render('restaurants/new', {user_id:req.session.id});
});

app.post("/restaurants/new", function (req, res) {
  var newRestuarant = req.body.restaurant;
	
  db.Restaurant.create(newRestuarant, function (err, restaurant) {
    if (restaurant) {
      res.redirect("/restaurants");
    } else {
      console.log(err);
      // TODO - handle errors in ejs!
    }
  });
});

app.get("/restaurants", routeMiddleware.ensureLoggedIn, function (req, res) {
  db.Restaurant.findById(req.session.id,function (err,restaurant){
      db.Restaurant.find({}).populate("user").exec( function (err, restaurants){
        if(err){
          res.render("errors/404");
        } else {
        	 // db.User.findById(req.session.id), function (err, restaurants) {
        	 // 	res.render('restaurants/index', {restaurants:restaurants});
        	 // }

          res.render('restaurants/index', {restaurants:restaurants});
        }
      })    
  })
}); 

app.get("/restaurants/:id", function (req,res){
    db.Restaurant.findById(req.params.id).populate("user").exec( function (err, restaurant){
    if(err){
      res.render("errors/404");
    } else {
      res.render('restaurants/show', {restaurant:restaurant});
    }
  })
});

app.get("/restaurants/:id/edit", function (req,res){
  db.Restaurant.findById(req.params.id, function (err, restaurant){
    if(err){
      res.render("errors/404");
    } else {
      res.render('restaurants/edit', {restaurant:restaurant});
    }
  })
});

app.put("/restaurants/:id", function (req, res) {
  db.Restaurant.findByIdAndUpdate(req.params.id, req.body.restaurant,  function (err, restaurant){
    if(err){
      res.render("404");
    } else{
      res.redirect('/restaurants');
    }
 })
});

app.delete("/restaurants/:id", function (req, res) {
  db.Restaurant.findByIdAndRemove(req.params.id, function (err, restaurant){
    if(err){
      res.render("404");
    } else{
      res.redirect('/restaurants');
    }
  })
})



//************************ ITEMS ************************//


//INDEX
// app.get('/restaurants/:restaurant_id/items', function (req,res){
//   db.Item.find({restaurant:req.params.restaurant_id}, function (err,items){
//     res.format({
//           'text/html': function(){ 
//             res.render("items/index", {items:items});
//           },

//           'application/json': function(){
//             res.send({ items: items });
//           },
//           'default': function() {
//             // log the request and respond with 406
//             res.status(406).send('Not Acceptable');
//           }
//     });
//   })
// });


// app.post("/items/new", function (req, res) {
//   var newRestuarant = req.body.restaurant;
  
//   db.Item.create(newRestuarant, function (err, restaurant) {
//     if (restaurant) {
//       res.redirect("/items");
//     } else {
//       console.log(err);
//       // TODO - handle errors in ejs!
//     }
//   });
// });

// app.get("/items", routeMiddleware.ensureLoggedIn, function (req, res) {
//   db.Item.findById(req.session.id,function (err,item){
//       db.Item.find({}).populate("user").exec( function (err, items){
//         if(err){
//           res.render("errors/404");
//         } else {
//            // db.User.findById(req.session.id), function (err, items) {
//            //   res.render('items/index', {items:items});
//            // }
//           res.render('items/index', {items:items});
//         }
//       })    
//   })
// }); 

// app.get("/items/:id", function (req,res){
//     db.Item.findById(req.params.id).populate("user").exec( function (err, item){
//     if(err){
//       res.render("errors/404");
//     } else {
//       res.render('items/show', {item:item});
//     }
//   })
// });

// app.get("/items/:id/edit", function (req,res){
//   db.Item.findById(req.params.id, function (err, item){
//     if(err){
//       res.render("errors/404");
//     } else {
//       res.render('items/edit', {item:item});
//     }
//   })
// });

// app.put("/items/:id", function (req, res) {
//   db.Item.findByIdAndUpdate(req.params.id, req.body.item,  function (err, item){
//     if(err){
//       res.render("404");
//     } else{
//       res.redirect('/items');
//     }
//  })
// });

// app.delete("/items/:id", function (req, res) {
//   db.Item.findByIdAndRemove(req.params.id, function (err, item){
//     if(err){
//       res.render("404");
//     } else{
//       res.redirect('/items');
//     }
//   })
// })


//************************ REMAINDER ************************//





app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/login");
});

app.get('*', function (req,res){
  res.render('errors/404');
});

app.listen(process.env.PORT || 3000, function (){
  console.log("Server is listening on port 3000");
});
