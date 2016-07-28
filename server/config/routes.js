var poke = require('./../controllers/poke.js');

// This is our routes.js file located in server/config/routes.js
 // This is where we will define all of our routing rules!
 // We will have to require this in the server.js file (and pass it app!)
 module.exports = function(app) {
 // verb: get, plural of target as the URI is the RESTful index method (it returns all friends)
  app.get('/location', function(req, res) {
    poke.login(req,res);
  });
  app.post('/new_location', function(req, res) {
    poke.search_area(req,res);
  });
 };
