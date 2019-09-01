import { NavigationPage } from './../navigation/navigation';
import { PerfilPage } from './../perfil/perfil';
import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PerfilPage;
  tab3Root = NavigationPage; 
  myIndex: number;

  constructor(navParams: NavParams) {
    // Set the active tab based on the passed index from menu.ts
    this.myIndex = navParams.data.tabIndex || 0;
  }
}
