var ContentHandler = require('./ContentHandler');
module.exports = exports = function(app, db) {
	console.log("routes index.js")

	var contentHandler = new ContentHandler(db);

	app.use(contentHandler.isLoggedInMiddleware)

	app.get('/', contentHandler.displayMainPage);
	app.post('/login', contentHandler.handleLogin)
	app.post('/signup', contentHandler.handleSignup)
	/*app.get('/login', contentHandler.displayLoginForm);
	app.get('/api/ingredients/allIngredients', contentHandler.returnAllIngredients);
	app.post('/api/loadRecipes', contentHandler.loadRecipesFromSelectedIngredients);


	app.get('/api/private/newrecipe', contentHandler.displayNewRecipe);
	app.post('/api/private/newrecipe', contentHandler.handleNewRecipe);*/

	app.use(function(req, res) {
    	res.status(404).end('error');
	});
}