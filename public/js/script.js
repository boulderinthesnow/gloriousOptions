$(function() {
  var map;
  var myLatLong = new google.maps.LatLng(37.7854224, -122.403726)
  var myOptions = {
    zoom: 15,
    center: myLatLong  
  }
  function initialize() {
   
    map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);
    var marker = new google.maps.Marker({
        position: myLatLong,
        map: map,
        title: 'Hello World!'
    });
    google.maps.event.addListener(window, 'load', addMarker)
  } // end initialize

  google.maps.event.addDomListener(window, 'load', initialize);

  function addMarker(event) {
  	console.log(event.latLng.A);
  	console.log(event.latLng.F);

  	//Add your code to add markers here
  }


  
  var allR = $("#allR").val();
  allR = allR.replace(/[, ]+/g, " ").trim().split("!");
  var firstAddress = allR[0].replace(/[ ]+/g, "+");

$.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + firstAddress).done(function (data) {
   console.log(data)
   var lat = (data.results[0].geometry.location.lat);
   var long = (data.results[0].geometry.location.lng);
   var address = data.results[0].formatted_address
   console.log(lat, long, address)
   var myLatlng = new google.maps.LatLng(lat,long);
});



  initialize();
});
