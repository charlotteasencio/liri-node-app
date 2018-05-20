require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var request = require("request");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var client = new twitter(keys.twitterKeys);
var spotify = new Spotify(keys.spotifyKeys);
var input = process.argv;
var command = input[2];
var media = input.splice(3).join(" ");

//get tweets
	var params = {screen_name: "charlottevennis", count: 20};

if(command == "my-tweets"){
	
		client.get("statuses/user_timeline", params, function(error, tweets, response) {
			if (!error) {
				for (i = 0; i < tweets.length; i ++){
					console.log("Tweet: " + "'" + tweets[i].temediat + "'" + " Created At: " + tweets[i].created_at);
				}
			} 
		}); //spotify
	} else if (command == "spotify-this-song"){

	if (!media){
        	media = 'The Sign';
    	}
		spotify.search({ type: 'track', query: media }, function(err, data) {
			if (err) {
			  return console.log('Error occurred: ' + err);
			}
		   
		  console.log(data); 
		  });//movies
	} else if (command=="movie-this") {

	request("http://www.omdbapi.com/?t=" + media + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
	
	  if (!error && response.statusCode === 200) {
	
		console.log("Title: ",JSON.parse(body).Title);
		console.log("Year: ",JSON.parse(body).Year);
		console.log("IMDB Rating: ",JSON.parse(body).imdbRating);
		console.log("Rotten Tomatoes Rating: ",JSON.parse(body).Ratings[1]);
		console.log("Country: ",JSON.parse(body).Country);
		console.log("Language: ",JSON.parse(body).Language);
		console.log("Plot: ",JSON.parse(body).Plot);
		console.log("Actors: ",JSON.parse(body).Actors);
	  }
	}); //do stuff
}  if (command == "do-what-it-says") {
	fs.readFile("random.txt", "utf8", function(error, data) {

		if (error) {
		  return console.log(error);
		}
		console.log(data);
	
		var dataArr = data.split(",");

		console.log(dataArr);
		dataArr[0] = command;
		dataArr[1] = media;
	  });
}
