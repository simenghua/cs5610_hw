module.exports = function (app) {

  app.put("/api/user/:userId", updateUser);
  app.get("/api/user/:userId", findUserById);
  app.get("/api/user/:username", findUserByUsername);
  app.get("/api/user", findUserByCredentials);
  app.post("/api/user", createUser);
  app.delete("/api/user/:userId", deleteUser);
  var users = [
    {_id: '123', username: 'jannunzi', password: 'jannunzi', firstName: 'Jose', lastName: 'Annunzi', email: 'jannunzi@gmail.com'},
    {_id: '234', username: 'bob', password: 'bob', firstName: 'Bob', lastName: 'Marley', email: 'bob@gmail.com'},
    {_id: '345', username: 'charly', password: 'charly', firstName: 'Charly', lastName: 'Garcia', email: 'charly@gmail.com'},
    {_id: '456', username: 'alice', password: 'alice', firstName: 'Alice', lastName: 'Wonderland', email: 'alice@gmail.com'}
  ];

  function deleteUser(req, res) {
    var userId = req.params["userId"];
    for (var i = 0; i < users.length; i++) {
      if (users[i]._id === userId) {
        users.splice(i, 1);
        return res.status(200);
      }
    }
  }

  function createUser(req, res) {
    var user = req.body;
    user._id = '' + Math.round(Math.random() * 1000);
    users.push(user);
    res.json(user);
  }

  function findUserByUsername(req, res) {
    var username = req.params["username"];
    var user = null;
    if (username) {
      user = users.find(function (user) {
        return user.username === username;
      });
    }
    res.json(user);
  }

  function findUserById(req, res) {
    var userId = req.params["userId"];
    var user = users.find(function (user) {
      return user._id === userId;
    });
    res.json(user);
  }


  function findUserByCredentials(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];
    var user = null;
    if (username && password) {
      user = users.find(function (user) {
        return user.username === username && user.password === password;
      });
    }
    if(!user){
      res.error.send();
      return;
    }
    res.send(user);
  }

  function updateUser(req, res) {
    var userId = req.params["userId"];
    var user = req.body;
    for (var i = 0; i < users.length; i++) {
      if (users[i]._id === userId) {
        users[i].username = user.username;
        users[i].firstName = user.firstName;
        users[i].lastName = user.lastName;
        users[i].email = user.email;
      }
    }
  }
}
