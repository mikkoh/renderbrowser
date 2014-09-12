var page = require( 'webpage' ).create(),
	events = require( './slimerEvent' ),
	renderLoop = require( './slimerRenderLoop' ),
	renderFrame = require( './slimerRenderFrame' );

var settings = null;

console.log( phantom.args[ 0 ] );

//validate and create settings
if( phantom.args[ 0 ] ) {
	
	try {

		settings = JSON.parse( phantom.args[ 0 ] );	

		if( settings.url === undefined ) {

			events.error( 'no url in settings JSON' );

			phantom.exit();
		}	
	} catch( e ) {

		settings = {

			url: phantom.args[ 0 ]
		};
	}
} else {

	events.error( 'you must pass in one argument which is either URL for page to render or' +
				  'a settings JSON object' );

	phantom.exit();
}

page.onCallback = function( msg ) {

	msg = JSON.parse( msg );

	switch( msg.id ) {

		case 'startRender':

			renderLoop( page, msg.data, function() {

				phantom.exit();
			});
		break;

		case 'renderFrame':

			renderFrame( page, msg.data );
		break;

		case 'exit':

			phantom.exit();
		break;
	}
};

page.open( settings.url, function( status ) {

	if( status == 'success' ) {

		var hasWindowInit = Boolean( page.evaluateJavaScript( 'Boolean( window.onRenderInit )' ) );
	
		if( !hasWindowInit ) {

			renderLoop( page, settings, function() {

				phantom.exit();
			});
		} else {

			page.evaluateJavaScript( 'window.onRenderInit()' );
		}
	} else {

		events.error( 'could not load page' );
	}
});