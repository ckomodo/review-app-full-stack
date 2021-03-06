// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Sets up file for handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Static directory
// app.use(express.static("public"));

// Routes
// =============================================================
// require("./routes/api-routes.js")(app);
// require("./routes/html-routes.js")(app);

app.get("/", function (req, res) {
  db.Review.findAll().then(reviews=>{
    console.log(reviews);
    res.render("index", {
      reviews: reviews
    }); //renders index.handlebars to browser.
  })
});

app.get("/profile", function (req, res) {
  res.render("profile"); //renders profile.handlebars to browser.
});

//GET route to READ/find all users
app.get("/api/users", function (req, res) {
  //R in CRUD
  db.User.findAll().then((users) => {
    res.json(users);
  });
});

//GET route to READ/find one user INCLUDES user's review
app.get("/api/users/:id", function (req, res) {
  //R in CRUD
  db.User.findOne({
    where: {
      id: req.params.id,
    },
    include: [db.Review],
  }).then((user) => {
    res.json(user);
  });
});

//POST route to CREATE users
app.post("/api/users", function (req, res) {
  // C in CRUD
  db.User.create({
    //creates a new user using structure below
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  })
    .then((newUser) => {
      res.json(newUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//PUT route to UPDATE users
app.put("/api/users/:id", function (req, res) {
  //U in CRUD
  db.User.update(
    {
      //where id given in "Where{}" below, take corresponding user and update fields below
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updateUser) => {
      if (updateUser[0] === 0) {
        res.status(404).json(updateUser);
      } else {
        res.json(updateUser);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//DELETE route to DELETE user by ID
app.delete("/api/users/:id", function (req, res) {
  db.User.destroy({
    where: {
      id: req.params.id,
    },include: [db.Review]
  })
    .then((data) => {
      if (data === 0) {
        res.status(404).json(data);
      } else {
        res.json(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//GET route to READ/get all Reviews
app.get("/api/reviews", function (req, res) {
  //R in CRUD
  db.Review.findAll({
    include: [db.User],
  })
    .then((reviews) => {
      res.json(reviews);
    })
    .then((data) => {
      if (err) {
        throw (err, res.status(500).json(err));
      } else {
        res.status(404).json(data);
      }
    });
});

//GET route to READ/get all Reviews from a specific user
app.get("/api/reviews:id", function (req, res) {
  //R in CRUD
  db.Review.findAll({
    where: {
      id: req.params.id
    },
    include: [db.User],
  })
    .then((reviews) => {
      res.json(reviews);
    })
    .then((data) => {
      if (err) {
        throw (err, res.status(500).json(err));
      } else {
        res.status(404).json(data);
      }
    });
});

//POST route to CREATE reviews
app.post("/api/reviews", function (req, res) {
  // C in CRUD
  db.Review.create({
    //creates a new user using structure below
    title: req.body.title,
    review: req.body.review,
    rating: req.body.rating,
    players: req.body.players,
    UserId: req.body.UserId,
  })
    .then((newReview) => {
      res.json(newReview);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
