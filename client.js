indexwindow.onRenderInit = window.onRenderInit || false;

module.exports = {

	startRender: function( settings ) {

		doCall( 'startRender', settings );
	},

	renderOneFrame: function( settings ) {

		doCall( 'renderFrame', settings );
	},

	exit: function() {

		doCall( 'exit' );
	}
};

function doCall( message, data ) {

	var out = {

		id: message,
		data: data || {}
	};

	window.callPhantom( JSON.stringify( out ) );
}