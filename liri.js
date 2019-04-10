require("dotenv").config();

var keys = require("./keys.js");
var Spotify = new Spotify(keys.spotify);
var Request = require('request');
var fs = require('fs');



var action = process.argv[2];

switch (action) {
    case "concert-this":
        listArtists();
        break;

    case "spotify-this-song":
        spotifyThis();
        break;

    case "movie-this":
        movieLookUp();
        break;

    case "do-what-it-says":
        doIt();
        break;


        function spotifyThis() {

            var nodeArgs = process.argv;
            var song = "";

            for (i = 3; i < nodeArgs.length; i++) {
                song = song + " " + nodeArgs[i];
            }

            if (nodeArgs.length === 3) {
                song = "Sunday Morning";
            }

            console.log("Searching... " + song);

            Spotify.search({ type: 'track', query: song }, function (error, data) {

                if (error) {
                    console.log('Error occurred! ' + error);
                    return;
                } else {
                    console.log("---------------------");

                    console.log("Artist(s): " + data["tracks"].items[1].artists[0].name);

                    console.log("Song Title: " + data["tracks"].items[0].name);

                    console.log("Preview: " + data["tracks"].items[0].preview_url);

                    console.log("Album Name: " + data["tracks"].items[0].album.name);
                    console.log("---------------------");
                }

            });
        }

        function movieLookUp() {

            var nodeArgs = process.argv;
            var movie = nodeArgs[3];

            for (i = 4; i < nodeArgs.length; i++) {

                movie += "+" + nodeArgs[i];
            }

            if (nodeArgs[3] === undefined) {
                movie = "Mr+Nobody";
            }




            var movieQueryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&r=json";




            Request(movieQueryURL, function (error, response, body) {

                if (error) {
                    console.log('error:', error);
                    console.log('statusCode:', response && response.statusCode);
                } else {


                    var obj = JSON.parse(body);

                    console.log("Rotten Tomatoes URL: " + obj.tomatoURL);

                    console.log("-------");

                    console.log("Title: " + obj["Title"]);

                    console.log("Year: " + obj["Year"]);

                    console.log("IMDB Rating: " + obj["imdbRating"]);

                    console.log("Produced in: " + obj["Country"]);

                    console.log("Plot: " + obj["Plot"]);

                    console.log("Language: " + obj["Language"]);

                    console.log("Actors: " + obj["Actors"]);

                    console.log("Rotten Tomatoes Rating: " + obj.Ratings[1].Value);

                    console.log("----------");
                }
            });
        }

        function doIt() {


            fs.readFile("random.txt", "utf8", function (error, data) {
                if (error) {
                    console.log('error:', error);
                    console.log('statusCode:', response && response.statusCode);
                } else {

                    var cleanData = data.replace(/['"]+/g, '');


                    var commands = cleanData.split(",");


                    for (i = 0; i < commands.length; i++)

                        process.argv[i + 2] = commands[i];

                }


                var action = process.argv[2];

                switch (action) {
                    case "artists":
                        listArtists();
                        break;

                    case "spotify-this-song":
                        spotifyThis();
                        break;

                    case "movie-this":
                        movieLookUp();
                        break;
                }

            });
        }
}