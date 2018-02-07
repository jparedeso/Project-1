function dineOut() {
  $(document).ready(function () {

    var test;
    var startPoint = "";                // Starting point location
    var endPoint = "";                  // Ending point location
    var modeOfTravel = "";              // Mode of travel for G-maps
    var map;                            // Global variable for map
    var autoLocate = false;             // Default setting for 'your address' value
    var pos;                            // Global var for autoLocate coordinates
    var lat;                            // latitude variable
    var lng;                            // longitudew variable
    var yourAddress;                    // Holds the human address

    // setTimeout(function () { $("#goOutToDinner").hide() }, 0);

    // setTimeout(function () { $("#goOutToDinner").show() }, 1000);

    function parameters() {
      ipLocationRequest();
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: { lat: 39.5, lng: -95.35 }        // America.
      });

      $("#submit").on('click', function () {    // Click to search for directions to the restaurant
        if (autoLocate == true) {
          startPoint = pos;
          $(".phldr").attr("placeholder", yourAddress);
          infoWindow.setContent(yourAddress);
        } else {
          startPoint = $("#start").val();
        }
        endPoint = $("#end").val();             // Center Map at these coordinates
        modeOfTravel = $("#mode").val();        // Setting travel mode to dropdown
        initMap();
      })
    }

    function initMap() {                                        // Center Map at these coordinates
      // map = new google.maps.Map(document.getElementById('map'), {
      //   zoom: 8,
      //   center: { lat: 95.7129, lng: 37.0902 }  // America.
      // });

      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        map: map,
        panel: document.getElementById('right-panel')
      });

      directionsDisplay.addListener('directions_changed', function () {
        computeTotalDistance(directionsDisplay.getDirections());
      });

      displayRoute(startPoint, endPoint, directionsService,
        directionsDisplay);
    }

    function displayRoute(origin, destination, service, display) {
      service.route({
        origin: origin,
        destination: destination,
        //   waypoints: [{location: 'Adelaide, SA'}, {location: 'Broken Hill, NSW'}],
        travelMode: modeOfTravel,
        avoidTolls: true
      }, function (response, status) {
        if (status === 'OK') {
          display.setDirections(response);
        } else {
          alert('Could not display directions due to: ' + status);
        }
      });
    }

    function computeTotalDistance(result) {
      var total = 0;
      var myroute = result.routes[0];
      for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
      }
      total = total * 0.621371 / 1000;
      document.getElementById('total').innerHTML = total.toFixed(2) + ' mi';
    }
    // setTimeout(function() { $("#right-panel").hide() }, 3000);
    // setTimeout(function() { $("#right-panel").show() }, 6000);
    // setTimeout(function() { $("#right-panel").hide() }, 9000);
    // setTimeout(function() { $("#right-panel").show() }, 12000);

    function ipLocationRequest() {
      infoWindow = new google.maps.InfoWindow;

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          autoLocate = true;

          lat = position.coords.latitude;
          lng = position.coords.longitude;

          var queryURL = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true";

          $.ajax({
            url: queryURL,
            method: "GET"
          }).done(function (response) {
            yourAddress = response.results[0].formatted_address;
          });

          infoWindow.setPosition(pos);
          infoWindow.setContent('Your Location');
          infoWindow.open(map);
          map.setCenter(pos);
          map.setZoom(12);
        }, function () {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
          'Error: The Geolocation service failed.' :
          'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
    }
    parameters();
  });
}
// setTimeout(function () { dineOut() },500);
// $("#view33_display_name").on("blur", function () {
//   test = $(this).val(function (i, val) {
//     return val.toUpperCase();
//     console.log(test);
//   });
// });

// $("#map-results").hide();
