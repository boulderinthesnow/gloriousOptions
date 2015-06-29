$(function() {

  // add my location to the map using HTML 5
  function getLocation() {
    if ("geolocation" in navigator) {
        changeButtonText();
     navigator.geolocation.getCurrentPosition(function (position) {
       console.log(position.coords.latitude, position.coords.longitude);
       myLatLong = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
       addMarker(myLatLong) 
        $("#myLocation").val("Found You!");   
        $("#myLocation").removeClass('fade')
     });
    } else {
      // no native support; maybe try a fallback?
    }
  }

  function changeButtonText(){
    window.setTimeout(function() {
      $("#myLocation").val("Finding You.......");
      }, 100)
    $("#myLocation").addClass('fade')
  }

  // navigator.geolocation.getCurrentPosition(success);

  // function success(position) {
  //   var lat = position.coords.latitude;
  //   var long = position.coords.longitude;
  //   var coords = new google.maps.LatLng(lat, long);
  //   return coords
  // }

  

  var map;
  var myLatLong = new google.maps.LatLng(37.7854224, -122.403726)
  //var myExactLatLong = new google.maps.LatLng(37.7854224, -122.403726)

  var myOptions = {
    zoom: 13,
    center: myLatLong  
}

    map = new google.maps.Map($('#map-canvas')[0], myOptions);



    var allR = $("#allR").val();
    console.log(allR,"*********ALLR**********");


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

// search arr for dups
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

  function randMillsec(){
    randNum = Math.floor(Math.random()*5000)+1
    console.log(randNum)
  }

   pointsArr = []
   markers = []
  // ajax call with address field, get geometry
  function pointsOnMap (arrayOfAddresses) {
    for (var i = 0; i < arrayOfAddresses.length; i++) {
        var urlAddress = arrayOfAddresses[i]
        $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + urlAddress).done(function (data) {
              var lat = (data.results[0].geometry.location.lat);
              var long = (data.results[0].geometry.location.lng);
              var address = data.results[0].formatted_address

              // if (!duplicateFound (pointsArr, lat, long) || markers.length === 0) {
                pointsArr.push({lat:lat, long:long})
                var myLatlng = new google.maps.LatLng(lat,long);
                window.setTimeout(function() {
                    addMarker(myLatlng)  
                    console.log (randMillsec())
                }, randMillsec());
              // } // END IF
              console.log(pointsArr)
              console.log(lat, long, address)
        });
    } // END FOR LOOP
  } // END FUNCTION 

  function loadRestrictions (restrict){
        $.getJSON("/restaurants/database").done( function (restaurants) {
      var tempArr = [];  
            // restaurants.forEach(function (restaurant) {
            //     if (restaurant[restrict]) {
            //         tempArr.push(restaurant.address)
            //     }
            // })

        for (var q = 0; q < restaurants.length; q++) {
               if (restaurants[q][restrict]) {
                    tempArr.push(restaurants[q].address)
               }
        };
        pointsOnMap (tempArr) 
    }).fail(function(err){
        console.log("SOMETHING WENT WRONG!", err.responseText);
    })
  }

  function clearMarkers() {
    setAllMap(null);
    var pointsArr = []
    var markers = []
  
  }

 $("#gf").click(function (){
    var gfTemp = loadRestrictions("gf")
 }) // end click 

 $("#df").click(function (){
    var dfTemp = loadRestrictions("df")
 }) // end clic

 $("#ef").click(function (){
    var efTemp = loadRestrictions("ef")
 }) // end clic

 $("#sf").click(function (){
    var sfTemp = loadRestrictions("sf")
 }) // end clic

  $("#clear").click(function (){
     clearMarkers();
     // var pointsArr = []
  }) // end click 


$("#logOut").click(function(){
    window.location.href='/logout';
})
$("#addRest").click(function(){
    window.location.href='/restaurants/new';
})
$("#myLocation").click(function(){
  // $("#myLocation").val("Finding You......")
  getLocation()  
})
// $("#list").click(function(){
//     window.location.href='#table';
// })

// $("#back-to-top").click(function(){
//     window.location.href='#top';
// })

$("#back-to-top").click(function() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});

$("#list").click(function() {
  $("html, body").animate({ scrollTop: $(document).height() }, "slow");
  return false;
});

$(function(){
  $('#keywords').tablesorter(); 
});


  // initialize();
});

