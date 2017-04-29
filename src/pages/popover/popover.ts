import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ViewController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login';
import { MyscrollsPage } from '../myscrolls/myscrolls';
import { MyvolunteersPage } from '../myvolunteers/myvolunteers';


@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html'
})
export class PopoverPage {
currentUser:any;
  constructor(public navCtrl: NavController,platform: Platform ,public storage: Storage, public navParams: NavParams,public viewCtrl: ViewController,public alertCtrl: AlertController) {
    platform.registerBackButtonAction(() => {
          this.viewCtrl.dismiss();
    });
  }

close() {
  this.viewCtrl.dismiss({close:true});
}
ionViewDidLoad() {
  console.log('ionViewDidLoad ProfilePage');
}

  
openProfile(){
  this.viewCtrl.dismiss({profile:true});
}
myScrolls(){
  this.viewCtrl.dismiss({myscrolls:true})
}
myVolunteers(){
  this.viewCtrl.dismiss({myvolunteers:true})
}
terms(){
  this.viewCtrl.dismiss({terms:true})
}
// ionViewWillEnter(){
//     this.storage.get('user').then((val) => {
//        console.log('Your name is', val);
//        this.currentUser=val.details;
//      })
//     }

logoutConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm Logout',
      message: 'Are you sure you want to logout ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Logout',
          handler: () => {
            this.viewCtrl.dismiss({logout:true})
          }
        }
      ]
    });
    alert.present();
  }



}
