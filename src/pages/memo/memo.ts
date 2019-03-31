import { Component } from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera/ngx";

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


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              public camera: Camera) {
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

    }
  }

  sendMemo() {

  }

}
