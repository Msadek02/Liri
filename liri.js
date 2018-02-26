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

  case 'movie-this':
      omdb();
}


function omdb(){
   var request = require("request");

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";
request(queryUrl, function (error, response , body){
if (!error && response.statusCode === 200) {
// console.log("the name of this movie is:",(JSON.parse(body)));
console.log("the name of this movie is:",(JSON.parse(body).Title));
console.log("the movie was released in:",(JSON.parse(body).Year));
console.log("IMDB Rating:",(JSON.parse(body).imdbRating));
console.log("Rotten tomatoes Rating:",(JSON.parse(body).Ratings[1].Value));
console.log("this movie was made in:",(JSON.parse(body).Country));
console.log("the language of this movie is:",(JSON.parse(body).Language));
console.log("the plot of this movie is:",(JSON.parse(body).Plot));
console.log("Actors:",(JSON.parse(body).Actors));
}
});
}



function twitter() {

var Twitter = require('twitter');
var keys = require('./keys.js');
 
var client = new Twitter(keys.twitter);

var status = 'statuses/user_timeline';
var params = { screen_name: value, count: 20 };
client.get(status, params, function(error, tweets, response) {
  if(!error){
    console.log("Here are the most recent tweets");

    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].text);
    } 
  }
});
}
// var keys = require('./keys.js');

// var Spotify = require('node-spotify-api');
 
// var spotify = new Spotify(keys.spotify);

// // var query = process.argv[3]

// spotify
//   .search({ type: 'track', query: "love" })
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });