$(function() {
  var map;
  var myLatLong = new google.maps.LatLng(37.7854224, -122.403726)

  var myOptions = {
    zoom: 13,
    center: myLatLong  
}

    map = new google.maps.Map($('#map-canvas')[0], myOptions);



    var allR = $("#allR").val();
    console.log(allR,"*********ALLR**********");

    
  //   function populateFromAPI (){
  //       allR = allR.replace(/[ ]+/g, " ").trim().split("!");
  //       for (var i = 0 ; i < allR.length -1 ; i++) {
  //         var urlAddress = allR[i].replace(/[ ]+/g, "+").replace(/^,/, ''); //add pluses for address, remove starting ,
  //         var urlAddressClear = urlAddress.replace(/,\+/g, ",") // replace ,+ with +

  //     $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + urlAddress).done(function (data) {
  //      var lat = (data.results[0].geometry.location.lat);
  //      var long = (data.results[0].geometry.location.lng);
  //      var address = data.results[0].formatted_address
  //      console.log(lat, long, address)
  //      var myLatlng = new google.maps.LatLng(lat,long);

  //       new google.maps.Marker({
  //              position: myLatlng,
  //              map: map
  //       }); //end marker
  //      }); //end function
  //     }; // end if
  // } //end populateFromAPI

  // Add a marker to the map and push to the array.
  function addMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map
      // animation: google.maps.Animation.DROP
    });
    markers.push(marker);
  }

  // Sets the map on all markers in the array.
  function setAllMap(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  function duplicateFound(arr, lat, long){
    for (var z = 0; z < arr.length; z++) {
        arrLat = arr[z].lat
        arrLong = arr[z].long
        if (arrLat === lat && arrLong === long){
            console.log ("DUP FOUND")
            return true
        }
    };
    return false
  }
  var pointsArr = []
  var markers = []
  function pointsOnMap (arrayOfAddresses) {
    for (var i = 0; i < arrayOfAddresses.length; i++) {
        var urlAddress = arrayOfAddresses[i]
        $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + urlAddress).done(function (data) {
              var lat = (data.results[0].geometry.location.lat);
              var long = (data.results[0].geometry.location.lng);
              var address = data.results[0].formatted_address
              if (!duplicateFound (pointsArr, lat, long)) {
                pointsArr.push({lat:lat, long:long})
                var myLatlng = new google.maps.LatLng(lat,long);
                addMarker(myLatlng)  
              } // END IF
              console.log(pointsArr)
              console.log(lat, long, address)
        });
    } // END FOR LOOP
  } // END FUNCTION 

  function loadRestrictions (restrict){
        $.getJSON("/restaurants/database").done( function (restaurants) {
      var tempArr = [];  
        // if (restrict === "GF") {
            restaurants.forEach(function (restaurant) {
                if (restaurant[restrict]) {
                    tempArr.push(restaurant.address)
                }
            })
            console.log(tempArr.length)
        pointsOnMap (tempArr)
    }).fail(function(err){
        console.log("SOMETHING WENT WRONG!", err.responseText);
    })
  }

  function clearMarkers() {
    setAllMap(null);
  }

 $("#gf").click(function (){
    var gfTemp = loadRestrictions("gf")
 }) // end click 

 $("#df").click(function (){
    var dfTemp = loadRestrictions("df")
 }) // end clic

 $("#gf").click(function (){
    var efTemp = loadRestrictions("gf")
 }) // end clic

 $("#gf").click(function (){
    var sfTemp = loadRestrictions("gf")
 }) // end clic

  $("#clear").click(function (){
     clearMarkers();
     // var pointsArr = []
  }) // end click 





  // initialize();
});

