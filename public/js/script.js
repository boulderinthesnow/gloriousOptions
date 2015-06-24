$(function() {
  var map;
  var myLatLong = new google.maps.LatLng(37.7854224, -122.403726)
  var myOptions = {
    zoom: 15,
    center: myLatLong  
  }
  // function initialize() {
   
    map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);
    
    // var marker = new google.maps.Marker({
    //     position: myLatLong,
    //     map: map,
    //     title: 'Hello World!'
    // });


   // google.maps.event.addListener(window, 'load', addMarker)
  //} // end initialize

 // google.maps.event.addDomListener(window, 'load', initialize);

  // function addMarker(event) {
  // 	console.log(event.latLng.A);
  // 	console.log(event.latLng.F);

  	//Add your code to add markers here
  //}
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
  console.log(allR,"*********ALLR**********");


  for (var i = 0 ; i < allR.length -1 ; i++) {
      var urlAddress = allR[i].replace(/[ ]+/g, "+"); //add pluses for address
      $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + urlAddress).done(function (data) {
         console.log(data,"*********DATA**********");
         
         var lat = (data.results[0].geometry.location.lat);
         var long = (data.results[0].geometry.location.lng);
         var address = data.results[0].formatted_address
         console.log(lat, long, address)
         var myLatlng = new google.maps.LatLng(lat,long);
         new google.maps.Marker({
             position: myLatlng,
             map: map
         });
      });

  };

  





  // initialize();
 });

