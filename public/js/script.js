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
    });
    markers.push(marker);
  }

  // Sets the map on all markers in the array.
  function setAllMap(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }


  var markers = []
  function pointsOnMap (arrayOfAddresses) {
    for (var i = 0; i < arrayOfAddresses.length; i++) {
        var urlAddress = arrayOfAddresses[i]
        $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + urlAddress).done(function (data) {
              var lat = (data.results[0].geometry.location.lat);
              var long = (data.results[0].geometry.location.lng);
              var address = data.results[0].formatted_address
              console.log(lat, long, address)
              var myLatlng = new google.maps.LatLng(lat,long);
              addMarker(myLatlng)
        });
    }
  }

  function loadOptions (option){
    var tempArr = [];
        $.getJSON("/restaurants/database").done( function (restaurants) {
        
        // if (option === "GF") {
            restaurants.forEach(function (restaurant) {
                if (restaurant[option]) {
                    tempArr.push(restaurant.address)
                }
            })

        // console.log(tempArr, "TEMPARR")
        pointsOnMap (tempArr)
    }).fail(function(err){
        console.log("SOMETHING WENT WRONG!", err.responseText);
    })
  }

  function clearMarkers() {
    setAllMap(null);
  }

  var flipper = false

 $("#GF").click(function (){
    console.log("foo")
    if (flipper === false) {
        // add map points
        //populateFromAPI()
        var gfTemp = loadOptions("gf")

        flipper = true
        return console.log("flipper is true")
    }
    if (flipper === true) {
        // remove map points
        clearMarkers()
        flipper = false
        return console.log("flipper is false")
    }
 })

 // $("#DF").click(function(){
 //    isChecked = $("#DF").is(':checked')
 //    console.log(isChecked)
 // })

 // $("#EF").click(function(){
 //    isChecked = $("#EF").is(':checked')
 //    console.log(isChecked)
 // })

 // $("#SF").click(function(){
 //    isChecked = $("#SF").is(':checked')
 //    console.log(isChecked)
 // })
  





  // initialize();
});

