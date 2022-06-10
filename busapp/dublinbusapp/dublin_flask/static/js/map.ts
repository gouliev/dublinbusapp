function initMap(): void {
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        mapTypeControl: false,
        center: { lat: 53.349722, lng: -6.260278 },
        zoom: 13,
      }
    );
  
    new AutocompleteDirectionsHandler(map);
  }
  
  class AutocompleteDirectionsHandler {
    map: google.maps.Map;
    originPlaceId: string;
    destinationPlaceId: string;
    travelMode: google.maps.TravelMode;
    directionsService: google.maps.DirectionsService;
    directionsRenderer: google.maps.DirectionsRenderer;
  
    constructor(map: google.maps.Map) {
      this.map = map;
      this.originPlaceId = "";
      this.destinationPlaceId = "";
      this.travelMode = google.maps.TravelMode.TRANSIT;
      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer();
      this.directionsRenderer.setMap(map);
  
      const originInput = document.getElementById(
        "origin-input"
      ) as HTMLInputElement;
      const destinationInput = document.getElementById(
        "destination-input"
      ) as HTMLInputElement;
   
  
      // Specify just the place data fields that you need.
      const originAutocomplete = new google.maps.places.Autocomplete(
        originInput,
        { fields: ["place_id"] }
      );
  
      // Specify just the place data fields that you need.
      const destinationAutocomplete = new google.maps.places.Autocomplete(
        destinationInput,
        { fields: ["place_id"] }
      );

  
      this.setupPlaceChangedListener(originAutocomplete, "ORIG");
      this.setupPlaceChangedListener(destinationAutocomplete, "DEST");
  

     
    }
  
    // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.

  
    setupPlaceChangedListener(
      autocomplete: google.maps.places.Autocomplete,
      mode: string
    ) {
      autocomplete.bindTo("bounds", this.map);
  
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
  
        if (!place.place_id) {
          window.alert("Please select an option from the dropdown list.");
          return;
        }
  
        if (mode === "ORIG") {
          this.originPlaceId = place.place_id;
        } else {
          this.destinationPlaceId = place.place_id;
        }
  
        this.route();
      });
    }
  
    route() {
      if (!this.originPlaceId || !this.destinationPlaceId) {
        return;
      }
  
      const me = this;
  
      this.directionsService.route(
        {
          origin: { placeId: this.originPlaceId },
          destination: { placeId: this.destinationPlaceId },
          travelMode: this.travelMode,
        },
        (response, status) => {
          if (status === "OK") {
            me.directionsRenderer.setDirections(response);
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
    }
  }
  
  declare global {
    interface Window {
      initMap: () => void;
    }
  }
  window.initMap = initMap;
  export {};