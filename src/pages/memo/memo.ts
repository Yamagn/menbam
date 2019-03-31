import { Component } from '@angular/core';
import {ActionSheetController, AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {SafeUrl} from "@angular/platform-browser";
import {DomSanitizer} from "@angular/platform-browser";

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

  memoText: string;
  image_uri: any;
  image_uri_for_preview: SafeUrl;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              public camera: Camera,
              public domSanitizer: DomSanitizer,
              public alertCrtl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemoPage');
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
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: sourceType,
        allowEdit: true,
        mediaType: this.camera.MediaType.PICTURE,
        encodingType: this.camera.EncodingType.JPEG
      };

      const getPicture = this.camera.getPicture(options);

      getPicture.then((imageData) => {
        this.image_uri = "data:image/jpeg;charset=utf-8;base64, " + imageData;

        this.image_uri = this.domSanitizer.bypassSecurityTrustUrl(this.image_uri);
      },(err) => {
        console.log(err);
        const alert =this.alertCrtl.create({
          title: "画像が選択できません",
          buttons: ["OK"]
        });
        alert.present();
      });
    }
  }

  sendMemo() {

  }

}
