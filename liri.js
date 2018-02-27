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
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
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
