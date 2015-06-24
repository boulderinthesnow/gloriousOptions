$(function() {
  var map;
  function initialize() {
    var myLatLong = new google.maps.LatLng(37.7854224, -122.403726)
    map = new google.maps.Map(document.getElementById('map-canvas'), {
      zoom: 15,
      center: myLatLong
    });

  } // end initialize

  google.maps.event.addDomListener(window, 'load', initialize);

  function addMarker(event) {
  	console.log(event.latLng.A);
  	console.log(event.latLng.F);

  	//Add your code to add markers here
    var marker = new google.maps.Marker({
        position: myLatLong,
        map: map,
        title: 'Hello World!'
    });
  }


  
  var allR = $("#allR").val();
  allR = allR.replace(/[, ]+/g, " ").trim().split("!");



  console.log(allR)
  initialize();
});
