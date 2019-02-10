console.log('this is loading');
console.log('');
console.log('======================================== Command Lines =====================================');
console.log('');
// `node liri.js concert-this '<artist/band name here>'`
console.log('Search by doing this: copy&paste -> [ node liri concert-this <concert>] -- get concert schedules');
// `node liri.js spotify-this-song '<song name here>'`
console.log('Search by doing this: copy&paste -> [ node liri spotify-this-song <song>] -- get info on songs');
// `node liri.js movie-this '<movie name here>'`
console.log('Search by doing this: copy&paste -> [ node liri movie-this <movie>] -- get info on movies');
// `node liri.js do-what-it-says`
console.log('Search by doing this: copy&paste -> [ node liri do-what-it-says ] -- get info in random.txt');

console.log('')
console.log('============================================================================================');

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};