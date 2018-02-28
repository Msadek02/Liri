require("dotenv").config();
var action = process.argv[2];
// var value = process.argv[3]; (THIS ONLY TAKES IN ONE NODE ARGUMENT FOR THE 3RD NODE SO ADDED CODE BELOW)
// STORE ALL OF THE ARGUMENTS IN AN ARRAY
var nodeArgs = process.argv;
// CREATE AN EMPTY VARIABLE FOR HOLDING USERS INPUT VALUE
var value = "";
// LOOPS THROUGH ALL THE WORDS IN THE NODE ARGUMENT 
// DO A LOOP TO GET EVERYTHING AFTER THE INDEX OF 2 NODE ARGUMENT
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        value = value + "+" + nodeArgs[i];
    } else {
        value = value + nodeArgs[i];
    }
}
switch (action) {
    case 'my-tweets':
        twitter();
        break;
    case 'movie-this':
        omdb();
        break;
    case 'spotify-this-song':
        spotify();
        break;

    case 'do-what-it-says':
        dwis();
        break;
}

function omdb() {
    var request = require("request");
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("---------------------------------------------------");
            console.log(" ");
            console.log("the name of this movie is:", (JSON.parse(body).Title));
            console.log(" ");
            console.log("the movie was released in:", (JSON.parse(body).Year));
            console.log(" ");
            console.log("IMDB Rating:", (JSON.parse(body).imdbRating));
            console.log(" ");
            console.log("Rotten tomatoes Rating:", (JSON.parse(body).Ratings[1].Value));
            console.log(" ");
            console.log("this movie was made in:", (JSON.parse(body).Country));
            console.log(" ");
            console.log("the language of this movie is in:", (JSON.parse(body).Language));
            console.log(" ");
            console.log("the plot of this movie is:", (JSON.parse(body).Plot));
            console.log(" ");
            console.log("Actors:", (JSON.parse(body).Actors));
            console.log(" ");
            console.log("---------------------------------------------------");
        }
    });
}

function twitter() {
    var Twitter = require('twitter');
    var keys = require('./keys.js');
    var client = new Twitter(keys.twitter);
    var status = 'statuses/user_timeline';
    var params = {
        screen_name: value,
        count: 20
    };
    client.get(status, params, function(error, tweets, response) {
        if (!error) {
            console.log("Here are the most recent tweets");
            console.log("-------------------------------");
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
                console.log("-------------------------------");
            }
        }
    });
}

function spotify() {
    if (value != false)
    var keys = require('./keys.js');
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);
    spotify
        .search({
            type: 'track',
            query: value + '&limit=1&'
        })
        .then(function(response) {
            console.log("---------------------------------------------------");
            console.log(" ");
            console.log("The song you entered was " + value + ".");
            console.log(" ");
            console.log("Here is the infromation you requested!");
            console.log(" ");
            console.log("Track Title: " + response.tracks.items[0].name);
            console.log(" ");
            console.log("Artist Name: " + response.tracks.items[0].artists[0].name);
            console.log(" ");
            console.log("Album name: " + response.tracks.items[0].album.name);
            console.log(" ");
            console.log("Preview URL: " + response.tracks.items[0].preview_url);
            console.log(" ");
            console.log("---------------------------------------------------");
            
        })
        .catch(function(err) {
            console.log(err);
        });
}

function dwis() {

    //FS IS AN NPM PACKAGE FOR READING AND WRITING FILES 
    var fs = require('fs');

    // THIS BLOCK OF CODE READS FROM THE "random.txt" FILE.
    // IT IS IMPORTANT TO INCLUDE THE "utf8" PARAMETER OR THE CODE WILL PROVIDE STREAM DATA (GARBAGE)
    // THE CODE WILL STORE THE CONTENTS OF THE READING INSIDE THE VARIABLE "data" 
    fs.readFile("random.txt", "utf8", function(error, data) {

        //THIS SPLITS ALL THE INFORMATIOM INSIDE 
        data = data.split(',');

        var command;
        var parameter;

        if (data.length == 2) {
            command = data[0];
            parameter = data[1];
            console.log(command);
            console.log(parameter);
        }
        

        
        parameter = parameter.replace('"', '');
        parameter = parameter.replace('"', '');
       
        switch (command) {
            case 'my-tweets':
                value = parameter;
                twitter();
                break;

            case 'spotify-this-song':
                value = parameter;
                spotify();
                break;

            case 'movie-this':
                value = parameter;
                imdb();
                break;
        }

    });
}