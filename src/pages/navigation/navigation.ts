import { GoogleMaps } from '@ionic-native/google-maps/ngx';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMap } from '@ionic-native/google-maps/ngx';

declare var google;

@IonicPage()
@Component({
  selector: 'page-navigation',
  templateUrl: 'navigation.html',
})
export class NavigationPage {
  mapReady: boolean = false;
  map: GoogleMap;
  locations: any = {
    latitude: String,
    longitude: String
  };

  autocompleteService: any;
  placesService: any;
  query: string = '';
  places: any = [];
  searchDisabled: boolean;
  saveDisabled: boolean;
  latitude: number;
  longitude: number;
  location: any;


  constructor(private geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams,
    public zone: NgZone, public maps: GoogleMaps, public viewCtrl: ViewController) {
    this.locations.latitude = this.navParams.get("latitude")
    this.locations.longitude = this.navParams.get("longitude")

    this.searchDisabled = true;
    this.saveDisabled = true;

    if (this.mapReady == false) {
      this.initMap();
      this.mapReady = true;
    }
    else {
      this.goToLocation;
    }
  }

  initMap(): Promise<any> {
    return new Promise((resolve) => {

      this.geolocation.getCurrentPosition().then((position) => {

        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        let mapOptions = {
          center: latLng,
          zoom: 18
        }

        this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        this.autocompleteService = new google.maps.places.AutocompleteService();
        this.placesService = new google.maps.places.PlacesService(this.map);
        this.searchDisabled = false;

        this.mapReady = true;
        resolve(true);

      });

    });

  }

  goToLocation() {
    const position = new google.maps.LatLng(this.locations.latitude, this.locations.longitude);

    const mapOptions = {
      zoom: 18,
      center: position
    }

    // move the map's camera to position
    this.map.moveCamera(mapOptions);

  }

  selectPlace(place) {

    this.places = [];

    let location = {
      lat: null,
      lng: null,
      name: place.name
    };

    this.placesService.getDetails({ placeId: place.place_id }, (details) => {

      this.zone.run(() => {

        location.name = details.name;
        location.lat = details.geometry.location.lat();
        location.lng = details.geometry.location.lng();
        this.saveDisabled = false;

        const mapOptions = {
          zoom: 18,
          center: new google.maps.LatLng(this.location.lat, this.location.lng)
        }

        this.map.moveCamera(mapOptions);

        this.location = location;

      });

    });

  }

  searchPlace() {
    this.saveDisabled = true;

    if (this.query.length > 0 && !this.searchDisabled) {

      let config = {
        types: ['geocode'],
        input: this.query
      }

      this.autocompleteService.getPlacePredictions(config, (predictions, status) => {

        if (status == google.maps.places.PlacesServiceStatus.OK && predictions) {

          this.places = [];

          predictions.forEach((prediction) => {
            this.places.push(prediction);
          });
        }

      });

    } else {
      this.places = [];
    }
  }

  save() {
    this.viewCtrl.dismiss(this.location);
  }

  close() {
    this.viewCtrl.dismiss();
  }
}