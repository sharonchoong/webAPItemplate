const express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//swagger auto-generated documentation
var routeswagger = require('./swagger'); 
app.use('/', routeswagger);

//routing
var routesInstrument = require('./instrumentApi/routes/instrumentRoutes'); 
app.use('/', routesInstrument);
var routesCategory = require('./instrumentApi/routes/categoryRoutes'); 
app.use('/', routesCategory);

//authentication
//var auth = require('./authenticate.js'); 
//auth(app); 

app.listen(port);

console.log('RESTful API server started on: ' + port);