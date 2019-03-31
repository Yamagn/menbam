import { Component } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
  Platform
} from 'ionic-angular';
import {SafeUrl} from "@angular/platform-browser";
import {Camera} from "@ionic-native/camera/ngx";
import { AngularFireStorage } from 'angularfire2/storage';
import {CameraOptions} from "@ionic-native/camera";
import {Observable} from "rxjs";

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
})
export class MemoPage {

  ramen: any;
  image_uri: any;
  memoText: string;
  image_url_for_preview: SafeUrl;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private camera: Camera,
              private domSanitizer,
              private platform: Platform,
              private actionSheetCtrl: ActionSheetController,
              private fireStorage: AngularFireStorage,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.ramen = this.navParams.data.ramen;
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
          handler: () => { console.log("Cancel Clicked");}
        }
      ]
    });
    actionSheet.present()
  };

  public getImage(source_type: number) {
    return () => {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: source_type,
        allowEdit: true,
        mediaType: this.camera.MediaType.PICTURE,
        encodingType: this.camera.EncodingType.JPEG
      };

      const getPicture = this.camera.getPicture(options);

      getPicture.then( (imageData) => {
        this.image_uri = "data:image/jpeg;charset=utf-8;base64, " + imageData;

        this.image_url_for_preview = this.domSanitizer.bypassSecurityTrustUrl(this.image_uri);
      }, (err) => {
        console.log(err);
        const alert = this.alertCtrl.create({
          title: "画像を選択できません",
          buttons: ["OK"]
        });
        alert.present();
      });
    }
  }

  sendMemo() {
    if(!this.image_uri) {
      return Observable.of("");
    }
    let loader = this.loadingCtrl.create({
      content: "アップロード中..."
    });
    loader.present();

    let fileName: string = this.ramen.id;
    return Observable.fromPromise(
      this.fireStorage.ref(`images/${fileName}`).putString(this.image_uri,"data_url")
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
