var ContentHandler = require('./ContentHandler');
var path = require('path');
module.exports = function(app, db) {
    console.log("routes index.js")

    var contentHandler = new ContentHandler(db);

    //app.use(contentHandler.isLoggedInMiddleware)

    //app.get('/', contentHandler.displayMainPage);

    /*app.get('/login', contentHandler.displayLoginForm);
	app.get('/api/ingredients/allIngredients', contentHandler.returnAllIngredients);
	app.post('/api/loadRecipes', contentHandler.loadRecipesFromSelectedIngredients);


	app.get('/api/private/newrecipe', contentHandler.displayNewRecipe);
	app.post('/api/private/newrecipe', contentHandler.handleNewRecipe);*/



    /*


    ***************** EXPLICATIE ***************
    	http://stackoverflow.com/questions/31820067/angular-ui-router-pressing-refresh-causes-404-error

    */

    app.get('/*', function(req, res) {
        console.log("////////////////************")
        var url = path.resolve(__dirname + '/../views/index.html');
        res.sendFile(url, null, function(err) {
            if (err)
                res.status(500).send(err);
            else
                res.status(200).end();
        });
    });

    app.use(function(req, res) {
        res.status(404).end('error');
    });
}