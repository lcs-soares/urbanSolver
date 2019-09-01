import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {
  publication: any = {
    img: String,
    category: String
  }

  public categoriesEnergy = [
    { val: 'Lâmpada acesa de dia', isChecked: false },
    { val: 'Lâmpada apaga de noite', isChecked: false },
    { val: 'Falta de energia', isChecked: false },
    { val: 'Fiação irregular', isChecked: false }
  ];

  public categoriesClean = [
    { val: 'Descarte irregular de lixo', isChecked: false },
    { val: 'Entulho na calçada', isChecked: false },
    { val: 'Mato alto', isChecked: false }
  ];

  public categoriesPedestres = [
    { val: 'Ciclovia', isChecked: false },
    { val: 'Rampa de acessibilidade', isChecked: false },
    { val: 'Calçada', isChecked: false },
    { val: 'Faixa de pedestre', isChecked: false }
  ];

  public categoriesHealth = [
    { val: 'Poluição sonora', isChecked: false },
    { val: 'Foco de mosquito da dengue/zika', isChecked: false },
    { val: 'Animais perigosos', isChecked: false }
  ];

  public categoriesSecurity = [
    { val: 'Ponto de tráfico', isChecked: false },
    { val: 'Ponto de exploração sexual de menores', isChecked: false },
    { val: 'Ponto de assalto/roubo', isChecked: false }
  ];

  public categoriesTransit = [
    { val: 'Placa de sinalização quebrada/inexistente', isChecked: false },
    { val: 'Semáforo quebrado', isChecked: false },
    { val: 'Ponto de infração', isChecked: false },
    { val: 'Buraco na via', isChecked: false },
    { val: 'Veículo abandonado', isChecked: false },
    { val: 'Desnível na via', isChecked: false }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.publication.img = this.navParams.get("image")
  }

  selectCategory(category: any) {
    if (category.isChecked) {
      this.publication.category = category.val
      this.navCtrl.push('PublicationPage', {
        Publication: this.publication
      });
    }
  }

}
