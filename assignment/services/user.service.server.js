module.exports = function (app) {

  var userModel = require("../model/user/user.model.server");

  app.put("/api/user/:userId", updateUser);
  app.get("/api/user/:userId", findUserById);
  app.get("/api/user/:username", findUserByUsername);
  app.get("/api/user", findUserByCredentials);
  app.get("/api/user", findUser);
  app.post("/api/user", createUser);
  app.delete("/api/user/:userId", deleteUser);

  // var users = [
  //   {_id: '123', username: 'jannunzi', password: 'jannunzi', firstName: 'Jose', lastName: 'Annunzi', email: 'jannunzi@gmail.com'},
  //   {_id: '234', username: 'bob', password: 'bob', firstName: 'Bob', lastName: 'Marley', email: 'bob@gmail.com'},
  //   {_id: '345', username: 'charly', password: 'charly', firstName: 'Charly', lastName: 'Garcia', email: 'charly@gmail.com'},
  //   {_id: '456', username: 'alice', password: 'alice', firstName: 'Alice', lastName: 'Wonderland', email: 'alice@gmail.com'}
  // ];

  function deleteUser(req, res) {
    var userId = req.params["userId"];
    userModel.deleteUser(userId).then(
      function(stats) {
        res.send(200);
      },
      function(err) {
        res.statusCode(404).send(err);
      });
  }

  function createUser(req, res) {
    var user = req.body;
    console.log(user);
    userModel.createUser(user).then(
      function(user) {
        if (user) {
          res.json(user);
        } else {
          res.sendStatus(400).send('0');
        }
      },
      function (err) {
        res.statusCode(400).send(err);
      }
    );
  }

  function findUserByUsername(req, res) {
    var username = req.params["username"];
    userModel.findUserByUserName(username).then(
      function (user) {
        if (user) {
          res.json(user);
        } else {
          res.sendStatus(400).send('0');
        }
      },
      function (err) {
        res.statusCode(404).send(err);
      }
      );
  }

  function findUserById(req, res) {
    var userId = req.params["userId"];
    userModel.findUserById(userId).then(
      function(user) {
        if (user) {
          res.json(user);
        } else {
          res.sendStatus(400).send('0');
        }
      },
      function(err) {
        res.sendStatus(404).send(err);
      }
    );

  }

  function findUserByCredentials(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];
    userModel.findUserByCredentials(username, password).then(
      function(user) {
        if (user) {
          res.json(user);
        } else {
          res.sendStatus(400).send('0');
        }
      },
      function(err) {
        res.sendStatus(400).send(err);
      }
    );
  }

  function findUser(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];
    // var user = null;
    if (username && password) {
      var promise = userModel.findUserByCredentials(username, password);
      promise.then(function(user){
        if (user) {
          res.json(user);
        } else {
          res.sendStatus(400).send('0');
        }
      });
      return;
    } else if (username) {
      userModel.findUserByUserName(username).then(function(user) {
        if (user) {
          res.json(user);
        } else {
          res.sendStatus(400).send('0');
        }
      });
      return;
    }
    res.json(users);
  }

  function updateUser(req, res) {
    var userId = req.params["userId"];
    var user = req.body;
    userModel.updateUser(userId, user).then(
      function(user) {
        if (user) {
          res.json(user);
        } else {
          res.sendStatus(400).send('0');
        }
      },
      function (err) {
        res.statusCode(404).send(error);
      });
  }
}



