var cp = require( 'child_process' ),
	event = require( './lib/slimerEvent' );

module.exports = function( settings, callBack ) {

	//start the slimer server with the settings stringified
	//when a specific message is received defined in slimerEvent then do callBack
	//on error do callBack and pass an error
	
	var slimer = cp.spawn( './node_modules/slimerjs/bin/slimerjs', [ 'lib/slimer.js', JSON.stringify( settings ) ] );

	slimer.stdout.on( 'data', function( data ) {

		try {

			var data = JSON.parse( data );
		} catch( e ) {

			console.log( 'From slimer:', data.toString() );
			return;
		}

		switch( data.id ) {

			case event.RENDER_START:

				doInfoMessage( 'render started' );
			break;

			case event.RENDER_PROGRESS:

				doInfoMessage( 'render progress: ' + Math.round( data.data.progress * 100 ) + '%' );
			break;

			case event.RENDER_COMPLETE:

				doInfoMessage( 'render ended' );
			break;

			case event.ERROR:

				throw new Error( 'Slimer error: ' + data.data.message );
			break;
		}
	});

	slimer.stderr.on('data', function (data) {

		throw new Error( 'Slimer error: ' + data );
	});

	slimer.on( 'close', function (code) {

		if( callBack )
			callBack();
	});
};

function doInfoMessage( settings, message ) {

	if( settings.debug ) {

		console.log( message );
	}
}