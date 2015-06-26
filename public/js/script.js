$(function() {
  var map;
  var myLatLong = new google.maps.LatLng(37.7854224, -122.403726)

  var myOptions = {
    zoom: 13,
    center: myLatLong  
}

    map = new google.maps.Map($('#map-canvas')[0], myOptions);



    var allR = $("#allR").val();
    allR = allR.replace(/[ ]+/g, " ").trim().split("!");

 function populateFromAPI (){
        for (var i = 0 ; i < allR.length -1 ; i++) {
          var urlAddress = allR[i].replace(/[ ]+/g, "+").replace(/^,/, ''); //add pluses for address, remove starting ,
          var urlAddressClear = urlAddress.replace(/,\+/g, ",") // replace ,+ with +

          $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + urlAddress).done(function (data) {
             var lat = (data.results[0].geometry.location.lat);
             var long = (data.results[0].geometry.location.lng);
             var address = data.results[0].formatted_address
             console.log(lat, long, address)
             var myLatlng = new google.maps.LatLng(lat,long);

             new google.maps.Marker({
                 position: myLatlng,
                 map: map
             }); //end marker
         });
      }; // end if
  } //end populateFromAPI

  var flipper = false
 $("#GF").click(function (){
    if (flipper === false) {
        // add map points
        populateFromAPI()
        flipper = true
        return console.log("flipper is true")
    }
    if (flipper === true) {
        // remove map points
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

