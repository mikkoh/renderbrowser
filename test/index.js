var renderer = require( '../index' );

renderer( { url: 'http://localhost:8000', debug: true, outPath: './test/', numFrames: 600 }, function() {

	console.log( '--done--' );
});