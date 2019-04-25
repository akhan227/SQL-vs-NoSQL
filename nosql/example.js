// import express and necessary Node packages
var express = require('express');

/*
 * Mongoose is an ODM: Object Data Mapper
 * It is a way for us to write JavaScript code inside of this .js file
 * that will interact with out Mongo DB database.
 * It is basically a JS layer on top of Mongo DB.
 */
var mongoose = require('mongoose');

// execute the function to initialize the project as an express app
var app = express();

// location of view files for responses 
app.set('views', './views');
// allows us to not have to write .ejs extension for every ejs file
app.set('view engine', 'ejs');


/*
 * try and find a database with name 'mydatabase' and connect to it.
 * if no database exists with the name 'mydatabase', it will create one
 */
var databaseName = 'mydatabase';
mongoose.connect('mongodb://localhost/' + databaseName, { useNewUrlParser: true });


/*
 * This doesn't do anything to our database.
 * It tells Javascript that we want to be able to add cats to our database,
 * and a cat should have a pattern that looks like this.
 * 
 * The benefit of NoSQL is that we aren't forbidden from adding new stuff
 * or leaving certain things off.
 * 
 * It's just a way of providing structure because we do need some sort of
 * predictable structure in order to write JS code that can handle cats.
 * 
 * Let's say that we want a template to print out a cat's name and age.
 * We would need to make sure that every cat has the name and age attribute,
 * and be able to anticipate any cats in our db that do not have a name or age
 */
var catSchema = new mongoose.Schema({
    name: String,
    age: Number
});

/*
 * Took the cat schema pattern that says every cat should have a name and age
 * and compiled it into a model and save it to a variable named 'Cat'
 * and now we can use the Cat variable to make new cats, find cats, and remove
 * cats from the database. 
 * 
 * It takes the first parameter passed to it and creates a collection with
 * that name.
 * In Mongo DB, a collection is similar to an SQL table
 */
var Cat = mongoose.model('Cat', catSchema);

// create a Cat object
var george = new Cat({
    name: "George",
    age: 11
});

/*
 * Try to save the created object to the database.
 * There is a possibility that the object won't save to the database,
 * for example if the Mongo server isn't running.
 * Passing in an anonymous function will report once the 
 * save to the database is complete or not
 */
// george.save(function(error, savedCat){
//     if (error) {
//         console.log('Something went wrong trying to save the data.');
//         console.log(error);
//     }
//     else {
//          console.log('Data successfully saved.');
//          console.log(savedCat);
//     }
// });


// new and save at the same time
// Cat.create({
//     name: "Snow White",
//     age: 15
// }, function(error, createdCat){
//     if (error) {
//         console.log('Something went wrong trying to save the data.');
//         console.log(error);
//     }
//     else {
//         console.log('Data successfully saved.');
//         console.log(createdCat);
//     }
// });


// Find all cat objects from the database
Cat.find({}, function(error, foundCats){
    if (error) {
        console.log('Something went wrong trying to find the data.');
        console.log(error);
    }
    else {
         console.log('Data successfully found.');
         console.log(foundCats);
    }
});







// root path
app.get('/', function(request, response){
    response.render('index');
});

app.post('/insert', function(request, response){

    response.send('you hit the post request')

});







const PORT = process.env.PORT || 5007;
const IP = process.env.IP || '127.0.0.1';

// allows the server to start listening for connections
var server = app.listen(PORT, IP, function(){
    console.log('Project server has started');
    var host = server.address().address;
    var port = server.address().port;
    console.log('running at http://' + host + ':' + port)
});