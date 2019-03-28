import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
              public bookmark: BookmarkProvider) {
  }

  ionViewDidLoad() {
    this.ramen = this.navParams.data.ramen;
  }

  doBookmark() {
    this.bookmark.put(this.ramen);
  }

  doCreate() {
    this.navCtrl.push(MemoPage);
  }
}
