import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { FoursquareServiceProvider } from "../../providers/foursquare-service/foursquare-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public foursquareService: FoursquareServiceProvider) {

  }

  authTest() {
    this.foursquareService.auth()
  }

}
