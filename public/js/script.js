$(function() {
  var map;
  var myLatLong = new google.maps.LatLng(37.7854224, -122.403726)

  var myOptions = {
    zoom: 13,
    center: myLatLong  
}

map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);



var allR = $("#allR").val();

allR = allR.replace(/[ ]+/g, " ").trim().split("!");
  // var allRStrip = allR[i]
  // console.log(allRStrip,"*********ALLRSTRIP**********");



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
       });
   });

  };

 gf = $("#GF").click(function(){
    console.log(gf.val())
 })
 console.log(gf,"*********GF**********");

  





  // initialize();
});

