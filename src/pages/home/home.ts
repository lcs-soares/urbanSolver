import { AngularFireAuth } from '@angular/fire/auth';
import { PublicationsProvider } from './../../providers/publications/publications';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  publications$: Observable<any>;
  user: any;
  location: string;
  options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  constructor(public navCtrl: NavController, private provider: PublicationsProvider, private afAuth: AngularFireAuth, private toast: ToastController,
    private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, public loadingCtrl: LoadingController) {
    this.user = this.afAuth.auth.currentUser;

    this.setCurrentAddress();
  }

  ngOnInit() {
    this.publications$ = this.provider.getAll(this.user.uid);
    const loader = this.loadingCtrl.create({
      content: "Espere um momento...",
      duration: 5000
    });
    loader.present();
  }

  async setCurrentAddress() {
    // let position = await this.geolocation.getCurrentPosition();

    // this.nativeGeocoder.reverseGeocode(position.coords.latitude, position.coords.longitude, this.options)
    //   .then((result: NativeGeocoderResult[]) => 
    //    this.toast.create({ message: JSON.stringify(result[0]), duration: 3000 }).present()
    //   )
    //   .catch((error: any) => console.log(error));
  }

  newPublication() {
    this.navCtrl.push('TakePhotoPage');
  }

  editPublication(Publication: any) {
    this.navCtrl.push('PublicationPage', { Publication: Publication });
  }

  removePublication(key: string) {
    if (key) {
      this.provider.remove(key)
        .then(() => {
          this.toast.create({ message: 'Publicação removida com sucesso.', duration: 3000 }).present();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao remover a publicação.', duration: 3000 }).present();
        });
    }
  }

  goToLocation(latitude: string, longitude: string) {
    this.navCtrl.push('NavigationPage', { latitude: latitude, longitude: longitude });
  }
}
