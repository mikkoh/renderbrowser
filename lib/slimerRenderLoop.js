var renderFrame = require( './slimerRenderFrame' ),
	events = require( './slimerEvent' );

module.exports = function( page, settings, callBack ) {

	settings = settings || {};

	var numRendered = 0,
		intervalID, stopRenderloop;

	settings.interval = settings.interval || 33;
	settings.startingNumber = settings.startingNumber || 0;
	settings.numFrames = settings.numFrames || 30;
	settings.imgBaseName = settings.imgBaseName || 'image_';
	settings.imgFormat = settings.imgFormat || 'png';

	events.out( events.RENDER_START );

	intervalID = setInterval( function() {

		settings.imgName = settings.imgBaseName + ( settings.startingNumber + numRendered ) + '.' + settings.imgFormat;
		
		renderFrame( page, settings );

		events.out( events.RENDER_PROGRESS, {

			progress: ++numRendered + '/' + settings.numFrames
		});

		if( numRendered == settings.numFrames ) {

			events.out( events.RENDER_COMPLETE );

			stopRenderloop();
		}
	}, settings.interval );

	stopRenderloop = function() {

		clearInterval( intervalID );
	};
		
	return stopRenderloop;
};