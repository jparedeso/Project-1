function initMap() {
    $(function () {
        // var test;
        var startPoint = "";                // Starting point location
        var endPoint = "";                  // Ending point location
        var modeOfTravel = "";              // Mode of travel for G-maps
        var map;                            // Global variable for map
        var autoLocate = false;             // Default setting for 'your address' value
        var pos;                            // Global var for autoLocate coordinates
        var lat;                            // latitude variable
        var lng;                            // longitudew variable
        var yourAddress;                    // Holds the human address
        var infoWindow = new google.maps.InfoWindow;
        var cuisine = 1;
        var restaurants;
        var markers = [];
        var directionsDisplay;

        initEventHandlers();

        function initEventHandlers() {
            $("#goOut-btn").on('click', requestIpLocation);

            $("#submit").on('click', function () {    // Click to search for directions to the restaurant
                if (autoLocate && $(".phldr").val() === "") {
                    startPoint = pos;
                    $(".phldr").attr("placeholder", yourAddress);
                    infoWindow.setContent(yourAddress);
                } else {
                    startPoint = $("#start").val();
                    $.ajax({
                        url   : "http://maps.google.com/maps/api/geocode/json",
                        data: { address: startPoint },
                        method: "GET"
                    }).done(function (res) {
                        infoWindow.setPosition({
                            lat: res.results[0].geometry.location.lat,
                            lng: res.results[0].geometry.location.lng
                        });
                        infoWindow.setContent("Starting Location");
                        if (directionsDisplay != null) {
                            directionsDisplay.setMap(null);
                            directionsDisplay = null;
                        }
                        configRoute();
                    });
                }
                // getRestaurantInfo(function(res, status) {
                //     restaurants = res.restaurants;
                //     console.log(restaurants);
                //     endPoint = restaurants[0].restaurant.location.address;
                //
                //     // endPoint = $("#end").val();             // Center Map at these coordinates
                //     modeOfTravel = $("#mode").val();        // Setting travel mode to dropdown
                //     configRoute();
                // });
            });

            $("#mode2").on("change", function() {
                deleteMarkers();
                cuisine = $(this).val();
                getRestaurantInfo(function (res, status) {
                    restaurants = res.restaurants;
                    endPoint = restaurants[0].restaurant.location.address;
                    displayMarkers();
                });
            });
        }

        // setTimeout(function() { $("#right-panel").hide() }, 3000);
        // setTimeout(function() { $("#right-panel").show() }, 6000);
        // setTimeout(function() { $("#right-panel").hide() }, 9000);
        // setTimeout(function() { $("#right-panel").show() }, 12000);

        function requestIpLocation() {
            // Try HTML5 geolocation.
            console.log("navigator.geolocation", navigator.geolocation);
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    lat = position.coords.latitude;
                    lng = position.coords.longitude;
                    pos = { lat: lat, lng: lng };

                    getRestaurantInfo(function(res, status) {
                        restaurants = res.restaurants;
                        console.log(restaurants);
                        endPoint = restaurants[0].restaurant.location.address;

                        $("#goOutToDinner").removeClass("hidden");

                        map = new google.maps.Map(document.getElementById('map'), {
                            zoom: position ? 11 : 3,
                            center: position ? pos : {lat: 39.5, lng: -95.35},
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        });

                        //region Display Current Location
                        autoLocate = true;
                        infoWindow.setPosition(pos);
                        infoWindow.setContent('Your Location');
                        infoWindow.open(map);
                        //endregion

                        //region Display Restaurants on map
                        displayMarkers();
                        //endregion
                    });

                    var queryURL = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true";
                    $.ajax({
                        url   : queryURL,
                        method: "GET"
                    }).done(function (response) {
                        yourAddress = response.results[0].formatted_address;
                    });
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
                    cuisines: cuisine,
                    lat     : lat,
                    lon     : lng
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

            for (i = 0; i < restaurants.length; i++) {
                var location = restaurants[i].restaurant.location;

                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(location.latitude, location.longitude),
                    map     : map
                });
                markers.push(marker);
                var bounds = new google.maps.LatLngBounds();
                bounds.extend(infoWindow.getPosition());
                for (var j = 0; j < markers.length; j++) {
                    bounds.extend(markers[j].getPosition());
                }

                map.fitBounds(bounds);
                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infowindow2.setContent(`<h3>${restaurants[i].restaurant.name}</h3>
                                                <p class="restaurantDirections" data-latitude="${restaurants[i].restaurant.location.latitude}" data-longitude="${restaurants[i].restaurant.location.longitude}">Show directions for this location.</p>
                                              `);
                        infowindow2.open(map, marker);
                        $(".restaurantDirections").on("click", function() {
                            if (directionsDisplay != null) {
                                directionsDisplay.setMap(null);
                                directionsDisplay = null;
                            }
                            $("#right-panel").html("");
                            console.log(cuisine);
                            if (autoLocate && $(".phldr").val() === "") {
                                startPoint = pos;
                                $(".phldr").attr("placeholder", yourAddress);
                                infoWindow.setContent(yourAddress);
                            } else {
                                startPoint = $("#start").val();
                            }
                            getRestaurantInfo(function(res, status) {
                                restaurants = res.restaurants;
                                console.log(restaurants);
                                endPoint = restaurants[i].restaurant.location.address;

                                // endPoint = $("#end").val();             // Center Map at these coordinates
                                modeOfTravel = $("#mode").val();        // Setting travel mode to dropdown
                                configRoute();
                            });
                        });
                    }
                })(marker, i));
            }
        }

        function deleteMarkers() {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            markers = [];
        }

        function configRoute() {
            var directionsService = new google.maps.DirectionsService;
             directionsDisplay = new google.maps.DirectionsRenderer({
                draggable: true,
                map      : map,
                panel    : document.getElementById('right-panel')
            });

            directionsDisplay.addListener('directions_changed', function () {
                computeTotalDistance(directionsDisplay.getDirections());
            });

            var config = {
                origin     : startPoint,
                destination: endPoint,
                //   waypoints: [{location: 'Adelaide, SA'}, {location: 'Broken Hill, NSW'}],
                travelMode : modeOfTravel,
                avoidTolls : true
            };

            displayRoute(config, directionsService, directionsDisplay);
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

        // setTimeout(function () { dineOut() },500);
        // $("#view33_display_name").on("blur", function () {
        //   test = $(this).val(function (i, val) {
        //     return val.toUpperCase();
        //     console.log(test);
        //   });
        // });

        // $("#map-results").hide();
    });
}