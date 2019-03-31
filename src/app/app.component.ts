import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FoursquareServiceProvider} from "../providers/foursquare-service/foursquare-service";
import { HomePage } from '../pages/home/home';
import { Storage } from "@ionic/storage";
@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private foursquareService: FoursquareServiceProvider,
              private storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    // let url: string = location.toString();
    // let code: string = "";
    // if(url.indexOf("?code=") != -1) {
    //   code = url.split("?code=")[1];
    //   console.log("code: " + code);
    //   this.foursquareService.getToken(code);
    // }
    //
    // let token = "";
    // this.storage.get("token").then((t) => {
    //   token = t;
    // });
    //
    // if (code === "") {
    //   this.foursquareService.auth();
    // }
    // return
  }
}

