// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:dateparam", function (req, res) {
  let dateparam = req.params.dateparam;
  var newDate = new Date();

  if (dateparam.includes("-")) {
    newDate = new Date(dateparam);
    console.log('date api endpoint')    
  } else {
    let unixParam = Number(dateparam);
    newDate = new Date(unixParam);
    console.log('unix api endpoint')
  }

  let unix = newDate.getTime();
  let utc = newDate.toGMTString();

  // if (Object.prototype.toString.call(newDate) === '[object Date]') {
  //   if (isNaN(unix)) {
  //     // do nothing as date is invalid
  //     console.log(req.params.dateparam);
  //   } else {
  //     // create json object
  //     let timestamp = {
  //       unix: unix,
  //       utc: utc,
  //       newDate: newDate,
  //       dateparam: req.params.dateparam
  //     }    
  //     res.json(timestamp);
  //   }
  // } else {
  //   // do nothing, date is invalid
  // }

  let timestamp = {
    unix: unix,
    utc: utc,
    newDate: newDate,
    dateparam: req.params.dateparam
  }    
  res.json(timestamp);
});

// app.get('/api/2015-12-25', function(req, res) {
//   let newDate = new Date(2015, 11, 25);
//   let unix = newDate.getTime();
//   let utc = newDate.toGMTString();

//   res.json({
//     unix: unix,
//     utc: utc
//   });
// }); 

// app.get('/api/1451001600000', function(req, res) {
//   let unix = new Date(1451001600000);

//   if (unix.date) {};

//   let utc = unix.toGMTString();
  
//   res.json({
//     unix: 1451001600000,
//     utc: utc
//   });
// });

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
