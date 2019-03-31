import {Component, OnInit} from '@angular/core';
import {NavController, Platform, LoadingController} from "ionic-angular";
import { FoursquareServiceProvider } from "../../providers/foursquare-service/foursquare-service";
import {Storage} from "@ionic/storage";
import {Environment, GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent} from "@ionic-native/google-maps";
import {DetailPage} from "../detail/detail";
import {BookmarkPage} from "../bookmark/bookmark";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  map: GoogleMap;
  ramens: any = [];

  constructor(public navCtrl: NavController,
              public foursquareService: FoursquareServiceProvider,
              public platform: Platform,
              public storage: Storage,
              public loadingController: LoadingController) {}

  async ngOnInit() {
    await this.platform.ready();
    // await this.loadMap()

    this.loadCheckins();
    this.loadMap();
  }

  loadCheckins() {
    let loader = this.loadingController.create({
      content: "Please wait..."
    });
    loader.present();

    this.foursquareService.getCheckins().subscribe((body: any) => {
      if (body && body.response && body.response.checkins) {
        this.ramens = body.response.checkins.items.filter(function(item) {
          return item.venue.categories[0].shortName === "ラーメン"
        });
      }
      loader.dismissAll();
    }, (error: any) => {
      loader.dismissAll();
    });
  }

  loadMap() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDcxw_gQOzT3sli1XjIW6fGlgJFT8jvlbo',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDcxw_gQOzT3sli1XjIW6fGlgJFT8jvlbo'
    });
    let element: HTMLElement = document.getElementById('map_canvas');
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 35.103611,
          lng: 137.148183
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
            lat: 35.103611,
            lng: 137.148183
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
              alert('clicked');
            });
          });
      });
  }

  openDetail(ramen) {
    this.navCtrl.push(DetailPage, {
      ramen: ramen
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

  openBookmark() {
    this.navCtrl.push(BookmarkPage);
  }

}
