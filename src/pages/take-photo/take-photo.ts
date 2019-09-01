import { Camera } from '@ionic-native/camera/ngx';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CameraPreviewPictureOptions, CameraPreviewOptions } from '@ionic-native/camera-preview/ngx';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-take-photo',
  templateUrl: 'take-photo.html'
})
export class TakePhotoPage {
  picture: string;
  myPhotosRef: any;
  myPhoto: any;
  myPhotoURL: any;
  loader: any

  cameraPictureOpts: CameraPreviewPictureOptions = {
    width: window.innerWidth,
    height: window.innerHeight,
    quality: 100
  };

  cameraOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    toBack: true,
    tapPhoto: true
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private camera: Camera, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.picture = null;
    this.myPhotosRef = firebase.storage().ref('/Photos/');
    this.showSelectType()
  }

  showSelectType() {
    const select = this.alertCtrl.create({
      title: 'Câmera ou galeria?',
      message: 'Sua foto já esta na galeria ou você prefere tirar uma foto nova?',
      buttons: [
        {
          text: 'Galeria',
          handler: () => {
            this.selectPhoto()
          }
        },
        {
          text: 'Câmera',
          handler: () => {
            this.takePhoto()
          }
        }
      ]
    });
    select.present();
  }



  takePhoto() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.presentLoading('show')

      this.myPhoto = imageData;
      this.uploadPhoto();

      this.presentLoading('hide')
      this.navCtrl.push('CategoriesPage', {
        image: this.myPhoto
      });
    }, error => {
      console.log("ERROR -> " + error);
    });
  }

  selectPhoto(): void {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: this.camera.EncodingType.PNG,
    }).then(imageData => {
      this.presentLoading('show')

      this.myPhoto = imageData;
      this.uploadPhoto();
      this.presentLoading('hide')

      this.navCtrl.push('CategoriesPage', {
        image: this.myPhoto
      });
    }, error => {
      console.log("ERROR -> " + error);
    });
  }

  private uploadPhoto(): void {
    this.myPhotosRef.child(this.generateUUID()).child('myPhoto.png')
      .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
      .then((savedPicture: { downloadURL: any; }) => {
        this.myPhotoURL = savedPicture.downloadURL;
      });
  }

  private generateUUID(): any {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  presentLoading(type: string) {
    if(type === 'show'){
      this.loader = this.loadingCtrl.create({
        content: "Espere um segundo..."
      });
      this.loader.present();
    }
    else{
      this.loader.dismiss()
    }
  }
}
