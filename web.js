var gzippo = require('gzippo'),
    express = require('express'),
    app = express();

// configure server
app.configure(function() {

  // parses request body and populates request.body
  app.use( express.bodyParser() );

  // check for http overides
  app.use( express.methodOverride() );

  // user for serving static files
  // app.use(express.logger('dev'));
  app.use(express.static(__dirname + "/dist"));

})

// Default route - show the visualisations here
app.get('/', function(req,res) {
  res.sendfile('./dist/index.html');
});

// This file hasn't been created yet but you can see
// how we could handle it
app.get('/reports', function(req,res) {
  res.sendfile('./dist/reports.html');
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
  res.sendfile('./dist/index.html');
});

app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');
