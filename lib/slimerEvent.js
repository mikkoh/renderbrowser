module.exports = {

	RENDER_START: 'render start',
	RENDER_PROGRESS: 'render progress',
	RENDER_COMPLETE: 'render complete',
	ERROR: 'error',

	out: function( key, data ) {

		console.log( JSON.stringify( {

			id: key,
			data: data
		}));
	},

	error: function( message ) {

		this.out( this.ERROR, {

			message: message
		});
	}
};

