import { Component } from '@angular/core';

import { LoginPage } from '../login/login';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {
    // console.log('about')
    // navCtrl.setRoot(LoginPage);
  }

}
