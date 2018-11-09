
var express = require('express');
var hbs  = require('express-handlebars');
const fileUpload = require('express-fileupload');
const XLSX=require('xlsx') ;
let file_name="";


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
  file_name=req.files.fileToUpload.name;
  req.files.fileToUpload.mv('./uploads/'+req.files.fileToUpload.name,(e)=>{
    if(e)
     return res.status(500).send(err);

   
    res.send('File mov');
  });
});


app.get('/do', function (req, res) {
  // res.send('Hello World!');

  // var wb = XLSX.readFile("./uploads/"+ file_name,{sheetRows: 100});//notar que si está vacio da error
   var wb = XLSX.readFile("./uploads/CSVFile_2018-11-05T12_27_28.csv",{sheetRows: 100});
   var sheet_name_list = wb.SheetNames;
   var data=XLSX.utils.sheet_to_json(wb.Sheets[sheet_name_list[0]], {raw: true, defval:null});
   console.log(JSON.stringify(data));
   var llaves=Object.keys(data[0]);
   console.log(llaves);
   basicFields=["Phone","First","Middle","Last","Address","City","State","Zip","Status"];
   extraFields=["Security code","DOB","Gender","Weight","Height","Pinsurance","Ppolicy","SSN","Sensurance","Spolicy","Rxbin","Rxpcn","Groupid","Phone Ins","Agent Comment","Pphysician","Paddress","Pcity","Pst","Pzip","Pphone","Pfax","NPI","Pcomment"];
   //basicFields=basicFields.map( v => {{v+":"+2}});
   console.log(JSON.stringify(basicFields));
   llaves=["",...llaves];
   res.render('match',{llaves,basicFields,extraFields});
  //res.send("hola")
 });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

