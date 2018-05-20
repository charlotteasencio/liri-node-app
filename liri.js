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
function myTweets(){
	var params = {screen_name: media, count: 20};
		client.get("statuses/user_timeline", params, function(error, tweets, response) {
			if (!error) {
				tweetsArray = tweets;

				for(i=0; i<tweetsArray.length; i++){
					console.log("Created at: " + tweetsArray[i].created_at);
					console.log("Text: " + tweetsArray[i].text);
				}
			}
			else{
				console.log(error);
			}
			});
	} 

//spotify if !media not working
function getSpotify(){

  spotify.search({
    type:"track",
    query: media}, function(err, data){

    if (err) {
      console.log("Error occurred: " + err);
      return;
		}
			
  if(!media){
      (media = "The Sign");
  } else{

  for (i = 0; i < 5; i++){

			var results = data.tracks.items[i];

      console.log("Artist: " + results.artists[0].name);
      console.log("Song: " + results.name);
      console.log("Song Link: " + results.external_urls.spotify);
      console.log("Album: " + results.album.name);
    }
	}
});
}

	//movies
	function getMovie(){
		if (!media){
			media = "Mr. Nobody";
		}

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
	}); 
}  

//do stuff
function doStuff(){
	fs.readFile("random.txt", "utf8", function(error, data) {

		if (error) {
		  return console.log(error);
		}
		console.log(data);
	
		var dataArr = data.split(",");

		console.log(dataArr);

//grab the command and media from the dataArr
		command = dataArr[0];
		media = dataArr[1];

//use command and media in already written functions
		run();

	  });
}

function run(){
if(command == "my-tweets"){
	myTweets();
} else if (command == "spotify-this-song"){
	getSpotify();
} else if (command == "movie-this"){
	getMovie();
} else if (command == "do-what-it-says"){
	doStuff();
}
}

run();