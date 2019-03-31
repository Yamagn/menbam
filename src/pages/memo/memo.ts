import { Component } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams, Platform, ToastController
} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {SafeUrl} from "@angular/platform-browser";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {Storage} from "@ionic/storage";
import {AngularFirestoreDocument} from "angularfire2/firestore/document/document";
import {AngularFirestoreCollection} from "angularfire2/firestore/collection/collection";
import {AngularFirestore} from "angularfire2/firestore/firestore";
import {AngularFireStorage} from "angularfire2/storage/storage";

/**
 * Generated class for the MemoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface Memo {
  content: string
}

@IonicPage()
@Component({
  selector: 'page-memo',
  templateUrl: 'memo.html',
  providers: [Camera]
})
export class MemoPage {

  ramen: any;
  memoText: string;
  image_uri: any;
  image_uri_for_preview: SafeUrl;
  existMemoText: string;
  memosCollection: AngularFirestoreCollection<Memo>;
  memoDocument: AngularFirestoreDocument<Memo>;



  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public actionSheetCtrl: ActionSheetController,
              public camera: Camera,
              public domSanitizer: DomSanitizer,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public fireStorage: AngularFireStorage,
              public storage: Storage,
              public afs: AngularFirestore,
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.ramen = this.navParams.data.ramen;
    this.memoText = this.navParams.data.memoText;

    this.memosCollection = this.afs.collection("memos");
    this.memoDocument = this.afs.doc(`memos/${this.ramen.id}`);
    console.log(this.memosCollection);
    console.log(this.memoDocument);
  }

  uploadImage() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "画像を選択",
      buttons: [
        {
          text: "撮影する",
          icon: "camera",
          handler: this.getImage(this.camera.PictureSourceType.CAMERA)
        },{
          text: "保存された画像を選択する",
          icon: "folder",
          handler: this.getImage(this.camera.PictureSourceType.PHOTOLIBRARY)
        },{
          text: "戻る",
          role: "cancel",
          handler: () => {console.log("canncel clicked");}
        }
      ]
    });
    actionSheet.present();
  };

  public getImage(sourceType: number) {
    return () => {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: sourceType,
        allowEdit: true,
        mediaType: this.camera.MediaType.PICTURE,
        encodingType: this.camera.EncodingType.JPEG
      };

      const getPicture = this.camera.getPicture(options);

      getPicture.then((imageData) => {

        this.image_uri = "data:image/jpeg;base64," + imageData;
        console.log(this.image_uri);
        this.image_uri_for_preview = this.domSanitizer.bypassSecurityTrustUrl(this.image_uri);
      },(err) => {
        console.log(err);
        const alert =this.alertCtrl.create({
          title: "画像が選択できません",
          buttons: ["OK"]
        });
        alert.present();
      });
    }
  }

  sendMemo() {
    let memo: Memo = {
      content: this.memoText
    };

    let loader = this.loadingCtrl.create({
      content: "アップロード中..."
    });

    this.memosCollection.doc(this.ramen.id).set(memo);

    let toast = this.toastCtrl.create({
      message: "メモを保存しました",
      duration: 1500
    });


    if (!this.image_uri) {
      toast.present();
      return Observable.of("");
    }

    loader.present();

    return Observable.fromPromise(
      this.fireStorage.ref(`images/${this.ramen.id}.jpg`).putString(this.image_uri, "data_url")
        .then((snapshot) => {
          loader.dismiss();
          toast.present();
          console.log("アップロード完了");
        }).catch((error) => {
          loader.dismiss();
          toast.present();
          console.log(error);
          console.log("アップロード失敗");
      })
    );

  }

}
