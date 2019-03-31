import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FoursquareServiceProvider} from "../../providers/foursquare-service/foursquare-service";
import {BookmarkProvider} from "../../providers/bookmark/bookmark";
import {MemoPage} from "../memo/memo";

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  ramen: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public bookmark: BookmarkProvider,
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.ramen = this.navParams.data.ramen;
  }

  doBookmark() {
    this.bookmark.put(this.ramen).then(() => {
      const toast = this.toastCtrl.create({
        message: "イベントをブックマークしました",
        duration: 1500
      });
      toast.present();
    });
  }

  doCreate() {
    this.navCtrl.push(MemoPage, {
      ramen: this.ramen
    });
  }
}
