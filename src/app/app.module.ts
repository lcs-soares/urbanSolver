
import { ComponentsModule } from './../components/components.module';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { PerfilPage } from '../pages/perfil/perfil';
import { NavigationPage } from '../pages/navigation/navigation';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { PublicationsProvider } from '../providers/publications/publications';
import { AuthenticationProvider } from '../providers/authentication/authentication';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';
import { GoogleMaps } from '@ionic-native/google-maps/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

const firebaseConfig = {
  apiKey: 'AIzaSyAZzvBrsiI378OBss3hrLwKe0_uAMPabbg',
  authDomain: "urbansolver-aae17.firebaseapp.com",
  databaseURL: "https://urbansolver-aae17.firebaseio.com/",
  projectId: 'urbansolver-aae17',
  storageBucket: "urbansolver-aae17.appspot.com",
  messagingSenderId: "467479424539"
}

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TabsPage,
    HomePage,
    PerfilPage,
    NavigationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TabsPage,
    HomePage,
    PerfilPage,
    NavigationPage
  ],
  providers: [
    GooglePlus,
    GoogleMaps,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    PublicationsProvider,
    AuthenticationProvider,
    Geolocation,
    Camera,
    CameraPreview,
    NativeGeocoder
  ]
})
export class AppModule { }
