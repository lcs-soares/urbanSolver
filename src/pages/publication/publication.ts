import { AngularFireAuth } from '@angular/fire/auth';
import { PublicationsProvider } from './../../providers/publications/publications';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';


@IonicPage()
@Component({
  selector: 'page-publication',
  templateUrl: 'publication.html'
})
export class PublicationPage {
  title: string;
  form: FormGroup;
  publication: any;
  user: any;

  placesService: any;
  query: string = '';
  places: any = [];
  searchDisabled: boolean;
  saveDisabled: boolean;
  autocompleteService: any;

  options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  constructor(
    public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private provider: PublicationsProvider,
    private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder,
    private afAuth: AngularFireAuth, private toast: ToastController) {

    this.publication = this.navParams.get("Publication") || {};
    this.user = this.user = this.afAuth.auth.currentUser;
    // this.publication.img = this.navParams.get("image")

    this.createForm();
    this.setupPageTitle();
    this.setCurrentAddress();
  }

  setupPageTitle() {
    this.title = this.navParams.data.contact ? 'Alterando publicação' : 'Nova publicação';
  }



  async setCurrentAddress() {
    let position = await this.geolocation.getCurrentPosition();

    this.nativeGeocoder.reverseGeocode(position.coords.latitude, position.coords.longitude, this.options)
      .then((result: NativeGeocoderResult[]) => this.publication.address = JSON.stringify(result[0].locality))
      .catch((error: any) => console.log(error));
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.publication.key],
      img: [this.publication.img],
      category: [this.publication.category, Validators.required],
      address: [this.publication.address, Validators.required],
      description: [this.publication.description, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value, this.user.uid)
        .then(() => {
          this.toast.create({ message: 'Publicação salva com sucesso.', duration: 3000 }).present();
          this.navCtrl.goToRoot(null);
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar a publicação.', duration: 3000 }).present();
          console.error(e);
        })
    }
  }

}