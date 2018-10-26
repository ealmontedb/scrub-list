
var express = require('express');
var hbs  = require('express-handlebars');
const fileUpload = require('express-fileupload');
const XLSX=require('xlsx') ;


var app = express();

app.use(fileUpload());

app.engine('hbs', hbs({ extname: 'hbs',defaultLayout: 'main'}));
app.set('view engine', 'hbs');


app.get('/', function (req, res) {
 // res.send('Hello World!');
  res.render('home');
});


app.post('/upload', function(req, res) {
  console.log(req.files.fileToUpload); // the uploaded file object
  req.files.fileToUpload.mv('./uploads/'+req.files.fileToUpload.name,(e)=>{
    if(e)
     return res.status(500).send(err);

   
    res.send('File mov');
  });
});


app.get('/do', function (req, res) {
  // res.send('Hello World!');

   var wb = XLSX.readFile("./uploads/Jc.xlsx");
   res.send('testing');
 });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

