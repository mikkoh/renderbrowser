module.exports = function( page, settings ) {

	settings = settings || {};

	settings.browserSize = settings.browserSize ? settings.browserSize.concat() : [ 980, 570 ];
	settings.clipRect = settings.clipRect ? settings.clipRect.concat() : [ 0, 0, settings.browserSize[ 0 ], settings.browserSize[ 1 ] ];
	settings.outPath = settings.outPath || './';
	settings.imgFormat = settings.imgFormat || 'png';
	settings.imgQuality = settings.imgQuality || 1;
	settings.imgName = settings.imgName || 'out.png';

	page.viewportSize = { width: settings.browserSize[ 0 ], height: settings.browserSize[ 1 ] };

	if( settings.clipRect ) {

		page.clipRect = { top: settings.clipRect[ 0 ], 
						  left: settings.clipRect[ 1 ], 
						  width: settings.clipRect[ 2 ], 
						  height: settings.clipRect[ 3 ] };
	} else {

		page.clipRect = { top: 0, 
						  left: 0, 
						  width: settings.browserSize[ 0 ], 
						  height: settings.browserSize[ 1 ] };	
	}

	page.render( settings.outPath + settings.imgName,
				 {
				 	format: settings.imgFormat,
				 	quality: settings.imgQuality
				 });
};