import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import {BookmarkProvider} from "../../providers/bookmark/bookmark";
import {DetailPage} from "../detail/detail";

/**
 * Generated class for the BookmarkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookmark',
  templateUrl: 'bookmark.html',
})
export class BookmarkPage {
  ramens: any[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public bookmarkProvider: BookmarkProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookmarkPage');
    this.bookmarkProvider.get().then( (ramens: any[]) => {
      console.log(ramens);
      this.ramens = ramens;
    })
  }

  openDetail(ramen) {
    this.navCtrl.push(DetailPage, {
      ramen: ramen
    });
  }

  deleteRamen(i) {
    this.ramens.splice(i, 1);
    this.bookmarkProvider.delete(i);
  }

}
