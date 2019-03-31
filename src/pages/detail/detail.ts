import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {BookmarkProvider} from "../../providers/bookmark/bookmark";

import {MemoPage} from "../memo/memo";
import {Observable} from "rxjs";
import {AngularFirestoreDocument} from "angularfire2/firestore/document/document";
import {AngularFirestore} from "angularfire2/firestore/firestore";

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
  memoText: string;
  image_url: string;
  memoDoc: AngularFirestoreDocument<any>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public bookmark: BookmarkProvider,
              public toastCtrl: ToastController,
              public afs: AngularFirestore) {

  }

  ionViewDidLoad() {
    this.ramen = this.navParams.data.ramen;
    this.memoDoc = this.afs.collection("memos").doc(this.ramen.id);
    this.memoDoc.valueChanges()
      .subscribe((memo : any) => {
        this.memoText = memo.content
    });

    this.image_url = `https://firebasestorage.googleapis.com/v0/b/menbam.appspot.com/o/images%2F${this.ramen.id}.jpg?alt=media`;
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
      ramen: this.ramen,
      memoText: this.memoText
    });
  }
}
