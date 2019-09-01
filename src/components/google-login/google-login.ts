import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform, ToastController } from 'ionic-angular';

import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
@Component({
  selector: 'google-login',
  templateUrl: 'google-login.html'
})
export class GoogleLoginComponent {
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private platform: Platform,
    public navCtrl: NavController, public navParams: NavParams, public toastController: ToastController) {
  }

  async nativeGoogleLogin(): Promise<void> {

    return this.gplus.login({ 'webClientId': '467479424539-rha64bhm6s9o4o4ea3e3ojq9t7euja3r.apps.googleusercontent.com' })
      .then(response => {

        this.toastController.create({ message: 'fez', duration: 2000 }).present();

        const googleCredential = firebase.auth.GoogleAuthProvider.credential(response.idToken);
        firebase.auth().signInWithCredential(googleCredential)
          .then(success => {
            this.toastController.create({ message: JSON.stringify(success), duration: 2000 }).present();
            // console.log("Firebase success: " + JSON.stringify(success));
            this.navCtrl.push(TabsPage)
          }).catch((err) => {
            this.toastController.create({ message: err, duration: 2000 }).present();
          });
      }).catch((error) => { 
        console.log(error)
        this.toastController.create({ message: 'erro' , duration: 2000 }).present(); 
      });

    // return new Promise((resolve, reject) => {

    //   this.gplus.login({
    //     'webClientId': '467479424539-rha64bhm6s9o4o4ea3e3ojq9t7euja3r.apps.googleusercontent.com',
    //     'offline': true
    //   }).then(res => {
    //     const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken);

    //     firebase.auth().signInWithCredential(googleCredential)
    //       .then(response => {
    //         resolve()
    //       });
    //   }, err => {
    //     reject(err);
    //   });
    // });

    // try {

    //   const toast2 = this.toastController.create({
    //     message: 'pt 2',
    //     duration: 2000
    //   });
    //   toast2.present();

    //   const gplusUser = this.gplus.login({
    //     'webClientId': '467479424539-rha64bhm6s9o4o4ea3e3ojq9t7euja3r.apps.googleusercontent.com',
    //     'offline': true,
    //     'scopes': 'profile email'
    //   })

    //     await this.toastController.create({message: gplusUser,duration: 2000}).present();

    //     this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))



    //   const toast = await this.toastController.create({
    //     message: 'tentando fazer login',
    //     duration: 2000
    //   });
    //   toast.present();



    //   this.navCtrl.push(TabsPage)
    // }
    // catch (err) {
    //   const toast = await this.toastController.create({
    //     message: 'erro' + err,
    //     duration: 4000
    //   });
    //   toast.present();
    //   console.log(err)
    // }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await this.afAuth.auth.signInWithPopup(provider);
      this.user$ = this.afAuth.authState;
      this.navCtrl.push(TabsPage);
    }
    catch (err) {

      const toast = await this.toastController.create({
        message: err,
        duration: 2000
      });
      toast.present();
      console.log(err)
    }
  }

  googleLogin() {
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
    }
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

}
