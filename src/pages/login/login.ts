import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticationProvider } from './../../providers/authentication/authentication';
import { TabsPage } from './../tabs/tabs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit{
  loginForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth,
     private auth: AuthenticationProvider, private formBuilder: FormBuilder, private toast: ToastController) {
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.checkLogin()
  }
  
  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  register() {
    this.auth.register(this.loginForm.value)
      .then(response => {
        this.navCtrl.setRoot(TabsPage);
      })
      .catch(error => {
        this.toast.create({ message: 'Erro ao realizar o cadastro: ' + error, duration: 3000 }).present();
      })
  }

  login() {
    this.auth.login(this.loginForm.value)
      .then(response => {
        this.navCtrl.setRoot(TabsPage);
      })
      .catch(error => {
        this.toast.create({ message: 'Erro ao realizar o login: ' + error, duration: 3000 }).present();
      
      })
  }

  checkLogin() {
    const user = this.afAuth.auth.currentUser;
    if (user) {
      this.navCtrl.push(TabsPage);
    }
  }
}
