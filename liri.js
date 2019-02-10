// Require! Require! Require!
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var command = process.argv[2];
var arg = process.argv;
var commandArr = [];
var userArr = [];
var log = 'log.txt';
// Loop to build an array of numbers
for (var i = 3; i < arg.length; i++) {
  userArr.push(arg[i]);
}
var user = userArr.join(" ");

commandArr.push(command);
if (userArr.length != 0) {
  commandArr.push(user);
}

function logFile(value) {
  fs.appendFile(log, ',' + value, function(err) {
    if(err) {
      return console.log('ERROR');
    }
  })
}
logFile(commandArr);

// Commands into variables
var concert = 'concert-this';
var spot = 'spotify-this-song';
var movie = 'movie-this';
var doWhat = 'do-what-it-says';
var readLog = 'read-the-log-file';
var theConcert = "";
var theSong = "";
var theMovie = "";



// When entering a command a function is called
if (command === concert) {
  concertThis(user);
}
if (command === spot) {
  spotifyThis(user);
}
if (command === movie) {
  movieThis(user);
}
if (command === doWhat) {
  doThis();
}
if (command === readLog) {
  logThis();
}

// Function that will run when entering command [ concert-this ]
function concertThis(user) {
  if (user.length === 0) {
    user = "Drake";
  }
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        user +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      console.log("");
      console.log(
        "===== CONCERT ==========[ Searched: " + user + " ]====="
      );
      console.log("");
      for (var i = 0; i < response.data.length; i++) {
        var venueName = response.data[i].venue.name;
        // console.log(venueName);
        var venueCity = response.data[i].venue.city;
        // console.log(venueCity)
        var venueState = response.data[i].venue.region;
        // console.log(venueState);
        var venueCountry = response.data[i].venue.country;
        // console.log(venueCountry);
        var venueTime = response.data[i].datetime;
        // console.log(venueTime);
        var momentVenueTime = moment(venueTime).format("LL");
        // console.log(momentVenueTime);

        // This is what will run in terminal
        console.log('===================================================================================================================================');
        console.log(
          user +
            " will be performing at " +
            venueName +
            " in " +
            venueCity +
            " " +
            venueState +
            ", " +
            venueCountry +
            " on " +
            momentVenueTime
        );
        console.log('===================================================================================================================================');
      }
    })
    .catch(function(error) {
      console.log("CONCERT ERROR: " + error);
    });
}

// Function that will run when entering command [ spotify-this-song ]
function spotifyThis(user) {
  if (user.length === 0) {
    user = "All the small things";
  }
  // API
  spotify
    .search({ type: "track", query: user })
    .then(function(response) {
      console.log("");
      console.log("===== SPOTIFY ==========[ Searched: " + user + " ]=====");
      console.log("");
      // Looping through the response items
      for (var i = 0; i < 5; i++) {
        var prevUrl = response.tracks.items[i].preview_url;
        if (prevUrl === null) {
          prevUrl = "No Available Url";
        }
        console.log('===================================================================================================================================');
        // * Artist(s)
        console.log('Artist Name: [ ' + response.tracks.items[i].artists[0].name + ' ]');
        // * The song's name
        console.log('Name of Song: [ ' + response.tracks.items[i].name + ' ]');
        // * The album that the song is from
        console.log('Album Name: [ ' + response.tracks.items[i].album.name + ' ]');
        // * A preview link of the song from Spotify
        console.log('Link: [ ' + prevUrl + ' ]');
        console.log('===================================================================================================================================');
      }
    })
    .catch(function(err) {
      console.log("ERROR" + err);
    });
}

// Function that will run when entering command [ movie-this ]
function movieThis(user) {
  if (user.length === 0) {
    user = "Mr.Nobody";
  }
  axios
    .get("http://www.omdbapi.com/?apikey=trilogy&t=" + user)
    .then(function(response) {
      // console.log(response);
      //   console.log(response.data);
      var rottenTomatoes = response.data.Ratings[1];
      //   console.log(rottenTomatoes);
      if (rottenTomatoes === undefined) {
        rottenTomatoes = "Unavailable";
      } else {
        rottenTomatoes = response.data.Ratings[1].Value;
      }
      console.log("");
      console.log(
        "===== MOVIE ==========[ Searched: " + response.data.Title + " ]====="
      );
      console.log('===================================================================================================================================');
      // * Title of the movie.
      console.log("Title Of Movie: [ " + response.data.Title + ' ]');
      // * Year the movie came out.
      console.log("Year Movie Published: [ " + response.data.Year + ' ]');
      // * IMDB Rating of the movie.
      console.log("IMDB Rating: [ " + response.data.imdbRating + ' ]');
      // * Rotten Tomatoes Rating of the movie.
      console.log("Rotten Tomatoes Rating: [ " + rottenTomatoes + ' ]');
      // * Country where the movie was produced.
      console.log("Country Produced: [ " + response.data.Country + ' ]');
      // * Language of the movie.
      console.log("Language: [ " + response.data.Language + ' ]');
      // * Plot of the movie.
      console.log("Plot: [ " + response.data.Plot + ' ]');
      // * Actors in the movie.
      console.log("Actors: [ " + response.data.Actors + ' ]');
      console.log('===================================================================================================================================');
    })
    .catch(function(error) {
      console.log("MOVIE ERROR: " + error);
    });
}

// // Function that will run when entering command [ do-what-it-says ]
function doThis() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }

    var dataArr = data.split(",");

    for (var i = 0; i < dataArr.length; i++) {
  
      if (dataArr[i] === concert) {
        theConcert = dataArr[++i];
        concertThis(theConcert);
      } else if (dataArr[i] === spot) {
        theSong = dataArr[++i];
        console.log("");
        spotifyThis(theSong);
      } else if (dataArr[i] === movie) {
        theMovie = dataArr[++i];
        movieThis(theMovie);
      } else {
        console.log("ERROR");
      }
    }
  });
}

// // Function that will run when entering command [ do-what-it-says ]
function logThis() {
  fs.readFile('log.txt', "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }

    var dataArr = data.split(",");

    for (var i = 0; i < dataArr.length; i++) {
   
      if (dataArr[i] === concert) {
        theConcert = dataArr[++i];
        concertThis(theConcert);
      } else if (dataArr[i] === spot) {
        theSong = dataArr[++i];
        console.log("");
        spotifyThis(theSong);
      } else if (dataArr[i] === movie) {
        theMovie = dataArr[++i];
        movieThis(theMovie);
      } else {
        console.log("ERROR");
      }
    }
  });
}