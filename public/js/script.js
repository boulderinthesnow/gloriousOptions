$(function() {

  // add my location to the map using HTML 5
  function getLocation() {
    if ("geolocation" in navigator) {
        changeButtonText();
     navigator.geolocation.getCurrentPosition(function (position) {
       console.log(position.coords.latitude, position.coords.longitude);
       myLatLong = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
       addMarkerUserLoc(myLatLong) 
        $("#myLocation").val("Found You!");   
        $("#myLocation").removeClass('fade')
     });
    } else {
      // no native support; maybe try a fallback?
      $("#myLocation").val("Find Failed :(");   
      $("#myLocation").removeClass('fade')
    }
  }

  function changeButtonText(){
    window.setTimeout(function() {
      $("#myLocation").val("Finding You.......");
      }, 100)
    $("#myLocation").addClass('fade')

  }

    // var one = new google.maps.LatLng(37, -122)
    // var two = new google.maps.LatLng(38, -125)
    // console.log(one,"*********ONE**********");

    // distanceBtwnPoints(one,two);

 // MAKE THIS FUNC ADD DISTANCE BTWN REST AND USER TO TABLE
    // function addDistanceToTable(userLoc, restLoc){
     
    // }

  function distanceBtwnPoints (latLngA,latLngB){
    var distance = google.maps.geometry.spherical.computeDistanceBetween (latLngA, latLngB);
    console.log(distance,"*********DISTANCE**********");

  }  

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
    return location
  }
    // Add a marker to the map at user location and push to the array.
  function addMarkerUserLoc(location) {
    var image = '/images/marker-youAreHere.png';
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      icon: image,
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
    //console.log(randNum)
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
                    addMarker(myLatlng)  
              // } // END IF
              console.log(pointsArr)
              console.log(lat, long, address)
        });
    } // END FOR LOOP
  } // END FUNCTION 
tempCount = 0;
  function loadRestrictions (restrict) {
        $.getJSON("/restaurants/database").done( function (restaurants) {
      var tempArr = [];  
        for (var q = 0; q < restaurants.length; q++) {
               if (restaurants[q][restrict]) {
                    tempArr.push(restaurants[q].address)
               } // END IF
        }; // END FOR LOOP
        pointsOnMap (tempArr) 
        tempArr.length
        tempArr = [];  
        tempCount += 1
        console.log(tempCount,"*********TEMPCOUNT**********");

    }).fail(function(err){
        console.log("SOMETHING WENT WRONG!", err.responseText);
    })
  } // END FUNCTION

  function clearMarkers() {
    setAllMap(null);
    var pointsArr = []
    var markers = []
  } // END FUNCTION

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
}) // END FUNCTION
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

// TABLE SORTER 
$(function(){
  $('#keywords').tablesorter(); 
});

// SIMPLE SWITCH TOGGLE SWITCH
  $("#gfSwitch").toggleSwitch({
    onLabel: "Gluten-Free",
    offLabel: "Gluten",
    width: "75px",
    height: "35px"

  });

 // SIMPLE SWITCH TOGGLE SWITCH
   $("#gfSwitch").toggleSwitch({
     onLabel: "Gluten-Free",
     offLabel: "Gluten",
     width: "75px",
     height: "35px"

   }); 

 // SIMPLE SWITCH TOGGLE SWITCH
   $("#dfSwitch").toggleSwitch({
     onLabel: "Dairy-Free",
     offLabel: "Dairy",
     width: "75px",
     height: "35px"

   });    



  // $('#gfSwitchDiv').click(function(event) {
  //   if ($("#gfSwitch").prop('checked')) {
  //     console.log("checked")
  //        loadRestrictions("gf");
  //   } else {
  //     console.log("unchecked")
  //   }
  // });
   

  //****** SWITCH ADD / REMOVE BEHAVIOR *******//

  var switchArr = {gf: false, df: false, ef: false, sf: false};

  // SEE IF SWITCH CHECKED OR NOT
    $('#gfSwitchDiv').click(function(event) {
      if ($("#gfSwitch").prop('checked')) {
           loadRestrictions("gf");
           switchArr.gf = true;
      } else {
          switchArr.gf = false;
          clearMarkers();
          for (key in switchArr) {
            if (switchArr[key] === true) {
              loadRestrictions(key);
            } // END IF
          } // END FOR LOOP

      } // END IF
    }); // END FUNCTION

  // SEE IF SWITCH CHECKED OR NOT
    $('#dfSwitchDiv').click(function(event) {
      if ($("#dfSwitch").prop('checked')) {
           loadRestrictions("df");
           switchArr.df = true;
           console.log(switchArr.df,"*********SWITCHARR.DF**********");

      } else {
          switchArr.df = false;
          console.log(switchArr.df,"*********SWITCHARR.DF**********");
          
          clearMarkers();
          for (key in switchArr) {
            if (switchArr[key] === true) {
              loadRestrictions(key);
            } // END IF
          } // END FOR LOOP

      } // END IF
    }); // END FUNCTION

  // SEE IF SWITCH CHECKED OR NOT
    $('#gfSwitchDiv').click(function(event) {
      if ($("#gfSwitch").prop('checked')) {
           loadRestrictions("gf");
           switchArr.gf = true;
      } else {
          switchArr.gf = false;
          clearMarkers();
          for (key in switchArr) {
            if (switchArr[key] === true) {
              loadRestrictions(key);
            } // END IF
          } // END FOR LOOP

      } // END IF
    }); // END FUNCTION

  // SEE IF SWITCH CHECKED OR NOT
    $('#gfSwitchDiv').click(function(event) {
      if ($("#gfSwitch").prop('checked')) {
           loadRestrictions("gf");
           switchArr.gf = true;
      } else {
          switchArr.gf = false;
          clearMarkers();
          for (key in switchArr) {
            if (switchArr[key] === true) {
              loadRestrictions(key);
            } // END IF
          } // END FOR LOOP

      } // END IF
    }); // END FUNCTION
     

// USE THIS LINE TO CARRY OVER USERS PREFERENCES INTO SELECTED ITEMS
   // $("#gfSwitch").prop('checked', true); 
   
});

