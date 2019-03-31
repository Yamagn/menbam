import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FoursquareServiceProvider } from '../providers/foursquare-service/foursquare-service';
import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage";
import {DetailPageModule} from "../pages/detail/detail.module";
import {BookmarkPageModule} from "../pages/bookmark/bookmark.module";
import {MemoPageModule} from "../pages/memo/memo.module";
import { BookmarkProvider } from '../providers/bookmark/bookmark';
import {firebase_api_key} from "../key";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';

export const firebaseConfig = {
  apiKey: firebase_api_key,
  authDomain: "menbam.firebaseapp.com",
  databaseURL: "https://menbam.firebaseio.com",
  projectId: "menbam",
  storageBucket: "menbam.appspot.com",
  messagingSenderId: "956453699163"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    DetailPageModule,
    BookmarkPageModule,
    MemoPageModule,
    // AngularFireModule.initializeApp(firebaseConfig),
    // AngularFireDatabaseModule,
    // AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FoursquareServiceProvider,
    BookmarkProvider,
    // AngularFireDatabase
  ]
})
export class AppModule {}
