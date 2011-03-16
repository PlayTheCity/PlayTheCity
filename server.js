
/**
 * Module dependencies.
 */

var express = require('express'),

	app = module.exports = express.createServer();


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  
  // Enable Less later on - when we're really using Less
  // Do not activate unless you are sure what you're doing
  // It will overwrite current stylesheets
  app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
  
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});


// Routes

// Index / Menu
app.get('/', function(req, res)
{
  res.render('index', 
  {
	stylesheet: 'menu'
  });
});

// Map
app.get('/map', function(req, res)
{
	res.render('map',
	{
		stylesheet: 'map',
		title: 'Stadtplan'
	});
});

// Profile / Achievements
app.get('/profile', function(req, res)
{
	res.render('profile',
	{
		stylesheet: 'profile',
		title: 'Profil'
	});
});

// Credits
app.get('/credits', function(req, res)
{
	res.render('credits',
	{
		stylesheet: 'credits',
		title: 'Mitwirkende'
	});
});

// Imprint / Contact
app.get('/contact', function(req, res)
{
	res.render('contact',
	{
		stylesheet: 'contact',
		title: 'Impressum'
	});
});

// Games
app.get('/quiz', function(req, res)
{
	res.render('quiz',
	{
		stylesheet: 'quiz',
		title: 'Quiz'
	});
});


// Only listen on $ node app.js

if (!module.parent) 
{
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port)
}

