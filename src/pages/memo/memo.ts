import { Component } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams, Platform
} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {SafeUrl} from "@angular/platform-browser";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {AngularFireStorage} from "angularfire2/storage";
import {Storage} from "@ionic/storage";
import {Memo} from "../../Models/Memo";

/**
 * Generated class for the MemoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public actionSheetCtrl: ActionSheetController,
              public camera: Camera,
              public domSanitizer: DomSanitizer,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public fireStorage: AngularFireStorage,
              public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemoPage');
    this.ramen = this.navParams.data.ramen;
    this.memoText = this.navParams.data.memoText;
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
    if (!this.image_uri) {
      return Observable.of("");
    }
    let loader = this.loadingCtrl.create({
      content: "アップロード中..."
    });
    loader.present();
    if(memo.content != "") {
      if(this.existMemoText != "") {
      } else {
      }
    }
    return Observable.fromPromise(
      this.fireStorage.ref(`images/${this.ramen.id}.jpg`).putString(this.image_uri, "data_url")
        .then((snapshot) => {
          loader.dismiss();
          console.log("アップロード完了");
        }).catch((error) => {
          loader.dismiss();
          console.log(error);
          console.log("アップロード失敗");
      })
    );
  }

}
