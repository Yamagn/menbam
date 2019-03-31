import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import {enviroment} from "../enviroment";
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FoursquareServiceProvider } from '../providers/foursquare-service/foursquare-service';
import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage";
import {DetailPageModule} from "../pages/detail/detail.module";
import {BookmarkPageModule} from "../pages/bookmark/bookmark.module";
import {MemoPageModule} from "../pages/memo/memo.module";
import { BookmarkProvider } from '../providers/bookmark/bookmark';
import { AngularFireModule } from 'angularfire2'
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireStorageModule } from "angularfire2/storage";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { File } from '@ionic-native/file'
import { Camera } from "@ionic-native/camera";

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
    AngularFireModule.initializeApp(enviroment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule
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
    BookmarkProvider
  ]
})
export class AppModule {}
