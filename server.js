// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
var bodyParser = require("body-parser"); //module body-parser
//set up pug
app.set("views", "./views");
app.set("view engine", "pug");
//body-parser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//low db
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);
// https://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  //req: request, res: response
  res.render("index"); //truyen vao path den file template ma minh muon render tinh ke tu view nay
});
// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});

app.get("/todos", function(req, res) {
  //req: request, res: response
  res.render("todos/index", {
    todos: db.get('todos').value()
  });
});

app.get("/todos/search", function(req, res) {
  var q = req.query.q;
  var matchTodos = todos.filter(function(todo) {
    return todo.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  //sau khi tìm xong thì render ra kết quả
  res.render("todos/index", {
    todos: matchTodos
  });
});

//bai 4

app.get("/todos/create", function(req, res) {
  res.render("todos/create");
});
app.post("/todos/create", function(req, res) {
  db.get('todos').push(req.body).write(); // push phan tu moi create vao todos
  res.redirect('/todos'); // res thu 2 de back ve todos
});
