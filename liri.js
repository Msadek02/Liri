require("dotenv").config();

// // var movieName = process.env[2];
// // // ...


// // // Then run a request to the OMDB API with the movie specified
// // var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
// // request(queryUrl, function (error, response , body){
// // if (!error && response.statusCode === 200) {
// // console.log("the movie was released in:",(JSON.parse(body)));
// // }
// // });

// // var request = require('request');
// // request('http://www.google.com', function (error, response, body) {
// //     console.log('body:', body); // Print the HTML for the Google homepage.
// // });
// var Twitter = require('twitter');

// var client = new Twitter(keys.twitter);

// client.get('favorites/list', function(error, tweets, response) {
//     if(error) throw error;
//     console.log(tweets);  
//     console.log(response);   
//   });

// var Spotify = require('node-spotify-api');
 
// Spotify
//   .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
//   .then(function(data) {
//     console.log(data); 
//   });


var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'mTtuna6SyS27E4no3D6X3yhbq',
  consumer_secret: 'LLbo8NIJ3a8k8mAbPZHYc7nbPqUb5MUJlG3aRdviUHzB46rwEU',
  access_token_key: '960692160898256896-i3iUYGq4Srzs84AA39h4y6fCcn1ioGb',
  access_token_secret: 'Lcok0fYob4bVv3v2faftUB93KezbKmNmPAsSDYieevMUk'
});

var status = 'statuses/user_timeline';
 
var params = {screen_name: 'nodejs'};
client.get(status , function(error, tweets, response) {
  if(error) throw error;

  for (var i = 0; i < tweets.length; i++) {
    console.log(tweets[i].text);
  }
});