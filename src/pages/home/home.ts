import {Component, OnInit} from '@angular/core';
import {NavController, Platform} from "ionic-angular";
import { FoursquareServiceProvider } from "../../providers/foursquare-service/foursquare-service";
import {GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent} from "@ionic-native/google-maps";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  map: GoogleMap;

  constructor(public navCtrl: NavController,
              public foursquareService: FoursquareServiceProvider,
              public platform: Platform) {}

  async ngOnInit() {
    await this.platform.ready();
    // await this.loadMap()
  }

  loadMap() {
    let element: HTMLElement = document.getElementById('map_canvas');
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };
    let map: GoogleMap = GoogleMaps.create(element, mapOptions);

    // Wait the MAP_READY before using any methods.
    map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        map.addMarker({
          title: 'Ionic',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: 43.0741904,
            lng: -89.3809802
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
              alert('clicked');
            });
          });
      });
  }

  // loadMap() {
  //   this.map = GoogleMaps.create("map_canvas", {
  //     camera: {
  //       target: {
  //         lat: 35.103611,
  //         lng: 137.148183
  //       },
  //       zoom: 18,
  //       tilt: 30
  //     }
  //   });
  // }

  authTest() {
    this.foursquareService.auth()
  }

}
