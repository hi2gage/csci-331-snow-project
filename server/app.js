//Load express module with `require` directive
var express = require('express')
var app = express()

//Define request response in root URL (/)
app.get('/', function (req, res) {
  res.send('I have fixed the git!!!!')
})

//Launch listening server on port 8080
app.listen(process.env.PORT || 5000, function () {
  console.log('app listening on port 5000 or whatever you like!')
})
