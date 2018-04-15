function initMap() {
    $(function () {
        // var test;
        var _startPoint = "";                // Starting point location
        var _endPoint = "";                  // Ending point location
        var _modeOfTravel = "";              // Mode of travel for G-maps
        var _map;                            // Global variable for map
        var _autoLocate = false;             // Default setting for 'your address' value
        var _pos;                            // Global var for autoLocate coordinates
        var _lat;                            // latitude variable
        var _lng;                            // longitudew variable
        var _yourAddress;                    // Holds the human address
        var _infoWindow = new google.maps.InfoWindow;
        var _cuisine = 1;
        var _restaurants;
        var _markers = [];
        var _directionsDisplay;

        initEventHandlers();

        function initEventHandlers() {
            $("#goOut-btn").on('click', requestIpLocation);

            $("#submit").on('click', function () {    // Click to search for directions to the restaurant
                if (_autoLocate && $(".phldr").val() === "") {
                    _startPoint = _pos;
                    $(".phldr").attr("placeholder", _yourAddress);
                    _infoWindow.setContent(_yourAddress);
                } else {
                    _startPoint = $("#start").val();
                    $.ajax({
                        url   : "http://maps.google.com/maps/api/geocode/json",
                        data: { address: _startPoint },
                        method: "GET"
                    }).done(function (res) {
                        _infoWindow.setPosition({
                            lat: res.results[0].geometry.location.lat,
                            lng: res.results[0].geometry.location.lng
                        });
                        _infoWindow.setContent("Starting Location");
                        if (_directionsDisplay != null) {
                            _directionsDisplay.setMap(null);
                            _directionsDisplay = null;
                        }
                        configRoute();
                    });
                }
            });

            $("#mode2").on("change", function() {
                deleteMarkers();
                _cuisine = $(this).val();
                getRestaurantInfo(function (res, status) {
                    _restaurants = res.restaurants;
                    _endPoint = _restaurants[0].restaurant.location.address;
                    displayMarkers();
                });
            });
        }

        function requestIpLocation() {
            // Try HTML5 geolocation.
            console.log("navigator.geolocation", navigator.geolocation);
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    _lat = position.coords.latitude;
                    _lng = position.coords.longitude;
                    _pos = { lat: _lat, lng: _lng };

                    getRestaurantInfo(function(res, status) {
                        _restaurants = res.restaurants;
                        console.log(_restaurants);
                        _endPoint = _restaurants[0].restaurant.location.address;

                        $("#goOutToDinner").removeClass("hidden");

                        _map = new google.maps.Map(document.getElementById('map'), {
                            zoom: position ? 11 : 3,
                            center: position ? _pos : {lat: 39.5, lng: -95.35},
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        });

                        //region Display Current Location
                        _autoLocate = true;
                        _infoWindow.setPosition(_pos);
                        _infoWindow.setContent('Your Location');
                        _infoWindow.open(_map);
                        //endregion

                        //region Display Restaurants on map
                        displayMarkers();
                        //endregion
                    });

                    var queryURL = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + _lat + "," + _lng + "&sensor=true";
                    $.ajax({
                        url   : queryURL,
                        method: "GET"
                    }).done(function (response) {
                        _yourAddress = response.results[0].formatted_address;
                    });
                }, function () {
                    handleLocationError(true, _infoWindow, _map.getCenter());
                });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, _infoWindow, _map.getCenter());
            }

            function handleLocationError(browserHasGeolocation, infoWindow, pos) {
                infoWindow.setPosition(pos);
                infoWindow.setContent(browserHasGeolocation ?
                    'Error: The Geolocation service failed.' :
                    'Error: Your browser doesn\'t support geolocation.');
                infoWindow.open(_map);
            }
        }

        // parameters();

        function getRestaurantInfo(cb) {
            var restaurantSearchURL = "https://developers.zomato.com/api/v2.1/search";
            var count = 5;

            $.ajax({
                url    : restaurantSearchURL,
                method : "GET",
                headers: {
                    "user-key": "8f83b9d0f09f880b5cf3880dc22dac54"
                },
                data   : {
                    count   : count,
                    cuisines: _cuisine,
                    lat     : _lat,
                    lon     : _lng
                },
                success: cb,
                error  : function (error) {
                    console.error(error);
                }
            });
        }

        function displayMarkers() {
            var infowindow2 = new google.maps.InfoWindow();

            var marker;
            var i;

            for (i = 0; i < _restaurants.length; i++) {
                var location = _restaurants[i].restaurant.location;

                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(location.latitude, location.longitude),
                    map     : _map
                });
                _markers.push(marker);
                var bounds = new google.maps.LatLngBounds();
                bounds.extend(_infoWindow.getPosition());
                for (var j = 0; j < _markers.length; j++) {
                    bounds.extend(_markers[j].getPosition());
                }

                _map.fitBounds(bounds);
                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infowindow2.setContent(`<h3>${_restaurants[i].restaurant.name}</h3>
                                                <p class="restaurantDirections" data-latitude="${_restaurants[i].restaurant.location.latitude}" data-longitude="${_restaurants[i].restaurant.location.longitude}">Show directions for this location.</p>
                                              `);
                        infowindow2.open(_map, marker);
                        $(".restaurantDirections").on("click", function() {
                            if (_directionsDisplay != null) {
                                _directionsDisplay.setMap(null);
                                _directionsDisplay = null;
                            }
                            $("#right-panel").html("");
                            console.log(_cuisine);
                            if (_autoLocate && $(".phldr").val() === "") {
                                _startPoint = _pos;
                                $(".phldr").attr("placeholder", _yourAddress);
                                _infoWindow.setContent(_yourAddress);
                            } else {
                                _startPoint = $("#start").val();
                            }
                            getRestaurantInfo(function(res, status) {
                                _restaurants = res.restaurants;
                                console.log(_restaurants);
                                _endPoint = _restaurants[i].restaurant.location.address;

                                // _endPoint = $("#end").val();             // Center Map at these coordinates
                                _modeOfTravel = $("#mode").val();        // Setting travel mode to dropdown
                                configRoute();
                            });
                        });
                    }
                })(marker, i));
            }
        }

        function deleteMarkers() {
            for (var i = 0; i < _markers.length; i++) {
                _markers[i].setMap(null);
            }
            _markers = [];
        }

        function configRoute() {
            var directionsService = new google.maps.DirectionsService;
             _directionsDisplay = new google.maps.DirectionsRenderer({
                draggable: true,
                map      : _map,
                panel    : document.getElementById('right-panel')
            });

            _directionsDisplay.addListener('directions_changed', function () {
                computeTotalDistance(_directionsDisplay.getDirections());
            });

            var config = {
                origin     : _startPoint,
                destination: _endPoint,
                //   waypoints: [{location: 'Adelaide, SA'}, {location: 'Broken Hill, NSW'}],
                travelMode : _modeOfTravel,
                avoidTolls : true
            };

            displayRoute(config, directionsService, _directionsDisplay);
        }

        function displayRoute(config, service, display) {
            service.route(config, function (response, status) {
                if (status === 'OK') {

                    display.setDirections(response);
                } else {
                    alert('Could not display directions due to: ' + status);
                }
            });
        }

        function computeTotalDistance(result) {
            var total = 0;
            var route = result.routes[0];
            for (var i = 0; i < route.legs.length; i++) {
                total += route.legs[i].distance.value;
            }
            total = total * 0.621371 / 1000; // convert from x to y
            $('#total').text(total.toFixed(2) + ' mi');
        }
    });
}