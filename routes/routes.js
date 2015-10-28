var ContentHandler = require('./ContentHandler');
var AuthenticationHandler = require('./AuthenticationHandler');
var path = require('path');
module.exports = function(app, db) {
    console.log("routes index.js")

    var contentHandler = new ContentHandler(db);
    var authenticationHandler = new AuthenticationHandler(db);

    app.get('/', function(req, res) {
        console.log("////////////////************")
        /*var url = path.resolve(__dirname + '/../views/index.html');
        res.sendFile(url, null, function(err) {
            if (err)
                res.status(500).send(err);
            else{
                res.status(200).end();
            }
        });*/
        res.render('index');
    });

    app.get('/partials/:name',function(req,res){
        console.log("req.params.name",req.params.name)
        var name = req.params.name;
        res.render('partials/'+  name)
    })

    app.post('/auth/login', authenticationHandler.login);
    app.post('/auth/signup', authenticationHandler.signup);


    app.get('/getIngredients', contentHandler.returnAllIngredients);
    app.get('/recipes', contentHandler.getRecipes);
    app.get('/allRecipes', contentHandler.getAllRecipes);

    app.get('/recipe/:ID',contentHandler.getRecipeByID)

    app.use('/api',authenticationHandler.ensureAuthenticated)
    //app.get('/api/me', contentHandler.myProfile)

    app.get('*',function(req,res){
        console.log("***********")
        res.render('index')
    })
    /*


    ***************** EXPLICATIE ***************
    	http://stackoverflow.com/questions/31820067/angular-ui-router-pressing-refresh-causes-404-error

    */





    app.use(function(req, res) {
        res.status(404).end('error');
    });
}