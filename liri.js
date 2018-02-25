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
}

// var request = require("request");


// var movieName = process.env[2];
// // ...


// // Then run a request to the OMDB API with the movie specified
// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
// request(queryUrl, function (error, response , body){
// if (!error && response.statusCode === 200) {
// console.log("the movie was released in:",(JSON.parse(body)));
// }
// });
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