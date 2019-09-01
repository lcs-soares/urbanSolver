import { LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';

@Injectable()
export class PublicationsProvider {
  private PATH = 'publications/';
  loader: any;
  constructor(private db: AngularFireDatabase, public loadingCtrl: LoadingController) {
  }

  getAll( userID: string) {
    this.presentLoading('show')

    let result = this.db.list(this.PATH, ref => ref.orderByChild('userID').equalTo(userID))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })

      this.presentLoading('hide')
      return result
  }

  get(key: string) {
    return this.db.object(this.PATH + key).snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      });
  }

  save(publication: any, userID: string) {
    return new Promise((resolve, reject) => {
      if (publication.key) {
        this.presentLoading('show')
        this.db.list(this.PATH)
          .update(publication.key, {userID: userID, category: publication.category, img: publication.img, address: publication.address, description: publication.description})
          .then(() => {
            this.presentLoading('hide')
            resolve()
          })
          .catch((e) => reject(e));
      } else {
        this.presentLoading('show')
        this.db.list(this.PATH)
          .push({ userID: userID, category: publication.category, img: publication.img, address: publication.address, description: publication.description, date: new Date().toISOString()})
          .then(() => {
            this.presentLoading('hide')
            resolve()
          });
      }
    })
  }

  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
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