$(function() {
  var map;
  function initialize() {
    map = new google.maps.Map(document.getElementById('map-canvas'), {
      zoom: 15,
      center: {lat: 37.7854224, lng: -122.403726}
    });
  }
  google.maps.event.addDomListener(window, 'load', initialize);

  function addMarker(event) {
  	console.log(event.latLng.A);
  	console.log(event.latLng.F);

  	//Add your code to add markers here
  }

  initialize();
});


