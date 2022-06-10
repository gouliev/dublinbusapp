"use strict";
export const __esModule = true;
function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        mapTypeControl: false,
        center: { lat: 53.349722, lng: -6.260278 },
        zoom: 13
    });
    new AutocompleteDirectionsHandler(map);
}
var AutocompleteDirectionsHandler = /** @class */ (function () {
    function AutocompleteDirectionsHandler(map) {
        this.map = map;
        this.originPlaceId = "";
        this.destinationPlaceId = "";
        this.travelMode = google.maps.TravelMode.TRANSIT;
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer();
        this.directionsRenderer.setMap(map);
        var originInput = document.getElementById("origin-input");
        var destinationInput = document.getElementById("destination-input");
        // Specify just the place data fields that you need.
        var originAutocomplete = new google.maps.places.Autocomplete(originInput, { fields: ["place_id"] });
        // Specify just the place data fields that you need.
        var destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput, { fields: ["place_id"] });
        this.setupPlaceChangedListener(originAutocomplete, "ORIG");
        this.setupPlaceChangedListener(destinationAutocomplete, "DEST");
    }
    // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.
    AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function (autocomplete, mode) {
        var _this = this;
        autocomplete.bindTo("bounds", this.map);
        autocomplete.addListener("place_changed", function () {
            var place = autocomplete.getPlace();
            if (!place.place_id) {
                window.alert("Please select an option from the dropdown list.");
                return;
            }
            if (mode === "ORIG") {
                _this.originPlaceId = place.place_id;
            }
            else {
                _this.destinationPlaceId = place.place_id;
            }
            _this.route();
        });
    };
    AutocompleteDirectionsHandler.prototype.route = function () {
        if (!this.originPlaceId || !this.destinationPlaceId) {
            return;
        }
        var me = this;
        this.directionsService.route({
            origin: { placeId: this.originPlaceId },
            destination: { placeId: this.destinationPlaceId },
            travelMode: this.travelMode
        }, function (response, status) {
            if (status === "OK") {
                me.directionsRenderer.setDirections(response);
            }
            else {
                window.alert("Directions request failed due to " + status);
            }
        });
    };
    return AutocompleteDirectionsHandler;
}());
window.initMap = initMap;
