var express= require("express");
var app = express();


var path = require("path");

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.json());

var connection = require("./db/connection");

app.get("/", function(req,res){
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res){
  res.sendFile(path.join(__dirname, "/public/note-taker.html"));
});

app.get("/api/notes", function(req, res){
  connection.query("SELECT * FROM notes", function(err, data){
    if(err){
      return res.json(err);
    }
    res.json(data)
    // console.log(data);
  });
});

app.post("/api/notes", function(req, res){
  connection.query("INSERT INTO notes SET ?",
  req.body, function(err, res){
    if (err) {
      return res.json(err);
    }
    else{
      console.log(res);
    }
  });
});

app.delete("/api/notes/:id", function(req, res) {
  connection.query("DELETE FROM notes WHERE id = ?", [req.params.id], function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});


app.listen(PORT, function(){
  console.log("App is listening on PORT: " + PORT);
})