var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var beerController = require('./controllers/beer');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');

mongoose.connect('mongodb://localhost:27017/beerlocker');

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(passport.initialize());


//****************Rotalar********************************************
var router = express.Router();

// api/beers
router.route('/beers')
  .post(authController.isAuthenticated, beerController.postBeers)
  .get(authController.isAuthenticated, beerController.getBeers);

// api/beers/:beer_id
router.route('/beers/:beer_id')
  .get(authController.isAuthenticated, beerController.getBeer)
  .put(authController.isAuthenticated, beerController.putBeer)
  .delete(authController.isAuthenticated, beerController.deleteBeer);

// api/users
router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

// api/users/:user_id
router.route('/users/:user_id')
  .get(authController.isAuthenticated, userController.getUser)
  .put(authController.isAuthenticated, userController.putUser)
  

router.post('/checkauth', authController.isAuthenticated, function(req, res){
    res.status(200).json({
        status: 'Login successful!'
    });
});

// /api
app.use('/api', router);
//**********************Rotalar**************************************


// Start the server
app.listen(3000);
console.log('Sunucu Calisiyor...');