(function($) {

/*
*  render_map
*
*  This function will render a Google Map onto the selected jQuery element
*
*  @type	function
*  @date	8/11/2013
*  @since	4.3.0
*
*  @param	$el (jQuery element)
*  @return	n/a
*/

var $window = $(window);

function render_map( $el ) {

	// vars
	var args = {
		zoom				: $el.data('gmap-zoom') ? $el.data('gmap-zoom') : 15,
		center				: new google.maps.LatLng(0, 0),
		disableDefaultUI	: true,
		mapTypeId			: google.maps.MapTypeId.ROADMAP,
		styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
	};

	// create map	        	
	var map = new google.maps.Map( $el[0], args);

	// add a markers reference
	map.markers = [];

	// add markers
	add_marker( $el, map );


	// center map
	center_map( map );

	$window.on('resize', function(){
		center_map(map);
	})

}

/*
*  add_marker
*
*  This function will add a marker to the selected Google Map
*
*  @type	function
*  @date	8/11/2013
*  @since	4.3.0
*
*  @param	$el (jQuery map element)
*  @param	map (Google Map object)
*  @return	n/a
*/

function add_marker( $el, map ) {

	// var
	var latlng = new google.maps.LatLng( $el.attr('data-gmap-lat'), $el.attr('data-gmap-lng') );

	// create marker
	var marker = new google.maps.Marker({
		position	: latlng,
		map			: map,
		icon		: $el.data('gmap-marker') != '' ? $el.data('gmap-marker') : ''
	});

	// add to array
	map.markers.push( marker );

}

/*
*  center_map
*
*  This function will center the map, showing all markers attached to this map
*
*  @type	function
*  @date	8/11/2013
*  @since	4.3.0
*
*  @param	map (Google Map object)
*  @return	n/a
*/

function center_map( map ) {

	// vars
	var bounds = new google.maps.LatLngBounds();

	// loop through all markers and create bounds
	$.each( map.markers, function( i, marker ){

		var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );

		bounds.extend( latlng );

	});

	// only 1 marker?
	if( map.markers.length == 1 )
	{
		// set center of map
		var center = bounds.getCenter();

		var windowWidth = window.innerWidth;

		if ( windowWidth <= 1200 ) {
			var lng = center.lng();
		} else {
			var lng = center.lng() + 0.01;
		}

	    map.setCenter({
	    	lat: center.lat(),
	    	lng: lng
	    });
	    // map.setZoom( 16 );
	}
	else
	{
		// fit to bounds
		map.fitBounds( bounds );
	}

}

/*
*  document ready
*
*  This function will render each map when the document is ready (page has loaded)
*
*  @type	function
*  @date	8/11/2013
*  @since	5.0.0
*
*  @param	n/a
*  @return	n/a
*/



$(document).ready(function(){

	$('.is-google-map').each(function(){

		render_map( $(this) );

	});



});

})(jQuery);