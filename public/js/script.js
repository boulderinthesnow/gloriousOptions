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
      map: map,
      animation: google.maps.Animation.DROP
    });
    markers.push(marker);
  }

  // Sets the map on all markers in the array.
  function setAllMap(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  function checkArrForDup(arr, lat, long){
    for (var z = 0; z < arr.length; z++) {
        arrLat = arr[z].lat
        arrLong = arr[z].long
        if (arrLat === lat && arrLong === long){
            console.log ("DUP FOUND")
            return false
        }
    };
    return true
  }
  var blackListArr = []
  var markers = []
  function pointsOnMap (arrayOfAddresses) {
    for (var i = 0; i < arrayOfAddresses.length; i++) {
        var urlAddress = arrayOfAddresses[i]
        $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + urlAddress).done(function (data) {
              var lat = (data.results[0].geometry.location.lat);
              var long = (data.results[0].geometry.location.lng);
              var address = data.results[0].formatted_address
              blackListArr.push({lat:lat, long:long})
              console.log(blackListArr)
              console.log(lat, long, address)
              var myLatlng = new google.maps.LatLng(lat,long);
              console.log(lat,"*********LAT**********");
              if (checkArrForDup (blackListArr, lat, long)) {

                addMarker(myLatlng)
              }
        });
    }
  }

  function dupCheck (tempArr, restAddr){
    // console.log(tempArr,"*********TEMPARR**********");
    // console.log(restAddr,"*********RESTADDR**********");


    for (var i = 0; i < tempArr.length; i++) {
        if (tempArr[i] === restAddr) {
            console.log(false)
            return false;
        };
    };
    return true;
  }

  function loadOptions (option){
        $.getJSON("/restaurants/database").done( function (restaurants) {
      var tempArr = [];  
        // if (option === "GF") {
            restaurants.forEach(function (restaurant) {
                if (restaurant[option] && dupCheck(tempArr, restaurant.address)) {
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
    var gfTemp = loadOptions("gf")
 }) // end click 

 $("#df").click(function (){
    var dfTemp = loadOptions("df")
 }) // end clic

 $("#gf").click(function (){
    var efTemp = loadOptions("gf")
 }) // end clic

 $("#gf").click(function (){
    var sfTemp = loadOptions("gf")
 }) // end clic

  $("#clear").click(function (){
     clearMarkers();
     markers = [];
     console.log(markers)
  }) // end click 





  // initialize();
});

