// Load required packages
var User = require('../models/user');

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    role:req.body.role
  });

  user.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'New beer drinker added to the locker room!' });
  });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
}


// Create endpoint /api/users/:user_id for GET
exports.getUser = function(req, res) {
  // Use the User model to find a specific user
   if (req.params.user_id==req.user._id.toString())
      {
        User.find({ _id: req.params.user_id }, function(err, user) {
          if (err)
            res.send(err);

          res.json(user);
        });
      }
      
      else
      {
         res.status(400).json({
            status: 'Access Denied'
          });
      }
};

// Create endpoint /api/users/:user_id for PUT
exports.putUser = function(req, res) {
  // Use the User model to find a specific user
  
  if (req.params.user_id==req.user._id.toString())
      {
  
  User.update({_id: req.params.user_id }, { name: req.body.name, surname:req.body.surname }, function(err, num, raw) {
    if (err)
      res.send(err);

    res.json({ message: num + ' guncellendi' });
  });
      }
      else
      {
         res.status(400).json({
            status: 'Access Denied'
          });
      }
};
