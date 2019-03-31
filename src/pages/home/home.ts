import {Component, OnInit} from '@angular/core';
import {NavController, Platform, LoadingController} from "ionic-angular";
import { FoursquareServiceProvider } from "../../providers/foursquare-service/foursquare-service";
import {Storage} from "@ionic/storage";
import {DetailPage} from "../detail/detail";
import {BookmarkPage} from "../bookmark/bookmark";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  ramens: any = [];
  lat: number = 35.103611;
  lng: number = 137.148183;
  zoom: number = 16;

  constructor(public navCtrl: NavController,
              public foursquareService: FoursquareServiceProvider,
              public platform: Platform,
              public storage: Storage,
              public loadingController: LoadingController) {}

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();

    this.loadCheckins();
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

  }

  openDetail(ramen) {
    this.navCtrl.push(DetailPage, {
      ramen: ramen
    });
  }

  openBookmark() {
    this.navCtrl.push(BookmarkPage);
  }

}
