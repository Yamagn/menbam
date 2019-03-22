import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FoursquareServiceProvider} from "../providers/foursquare-service/foursquare-service";
import { HomePage } from '../pages/home/home';
import {Environment} from "@ionic-native/google-maps";
@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private foursquareService: FoursquareServiceProvider) {
    platform.ready().then(() => {
      // Environment.setEnv({
      //   'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDcxw_gQOzT3sli1XjIW6fGlgJFT8jvlbo',
      //   'API_KEY_FOR_BROWSER_DEBUG': ''
      // });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    var url: string = location.toString()
    if(url.indexOf("?code=") != -1) {
      this.foursquareService.getToken(url.split("?code=")[1]);
    }
    return
  }
}

