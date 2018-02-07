var startPoint = $("input").val();           // Starting point location
console.log(startPoint);
var endPoint = "5756 Spring Gate Ct, Concord, NC 28027";  // Ending point location
var map;                                                  // Global variable for map
function initMap() {                                        // Center Map at these coordinates
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: { lat: 95.7129, lng: 37.0902 }  // America.
  });

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
  otherStuff();
}

function displayRoute(origin, destination, service, display) {
  service.route({
    origin: origin,
    destination: destination,
    //   waypoints: [{location: 'Adelaide, SA'}, {location: 'Broken Hill, NSW'}],
    travelMode: 'BICYCLING',
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

function otherStuff() {
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
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
