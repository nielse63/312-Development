
(function( w ){
	if( ! w.loadCSS ) {
		return;
	}

	let loadCSS = w.loadCSS;

	var rp = loadCSS.relpreload = {};
	rp.support = function(){
		try {
			return w.document.createElement( "link" ).relList.supports( "preload" );
		} catch (e) {
			return false;
		}
	};

	// loop preload links and fetch using loadCSS
	rp.poly = function(){
		var links = w.document.getElementsByTagName( "link" );
		for( var i = 0; i < links.length; i++ ){
			var link = links[ i ];
			if( link.rel === "preload" && link.getAttribute( "as" ) === "style" ){
				loadCSS( link.href, link );
				link.rel = null;
			}
		}
	};

	// if link[rel=preload] is not supported, we must fetch the CSS manually using loadCSS
	if( !rp.support() ){
		rp.poly();
		var run = w.setInterval( rp.poly, 300 );
		if( w.addEventListener ){
			w.addEventListener( "load", function(){
				w.clearInterval( run );
			} );
		}
		if( w.attachEvent ){
			w.attachEvent( "onload", function(){
				w.clearInterval( run );
			} )
		}
	}
}( this || window || global ));
