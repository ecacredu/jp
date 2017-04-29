import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Auth } from '../../providers/auth';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Storage } from '@ionic/storage';

/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  veri: FormGroup;
  public phone = '';

  constructor(public navCtrl: NavController, public auth: Auth, public navParams: NavParams, public formBuilder: FormBuilder, public storage: Storage) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  ngOnInit() {

    if (this.navParams.get('number') == undefined || this.navParams.get('number') == null) {
      let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
      this.veri = this.formBuilder.group({
        user_mobile: ['', [<any>Validators.required, <any>Validators.minLength(10)]],
        user_name: ['', [<any>Validators.required, <any>Validators.minLength(4)]],
        user_email: ['', [<any>Validators.required, <any>Validators.pattern(emailRegex)]],
        user_address: ['', [<any>Validators.required, <any>Validators.minLength(4)]]
      });
    } else {
      this.phone = this.navParams.get('number');
       let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
      this.veri = this.formBuilder.group({
        user_mobile: [this.phone, [<any>Validators.required, <any>Validators.minLength(10)]],
        user_name: ['', [<any>Validators.required, <any>Validators.minLength(4)]],
        user_email: ['', [<any>Validators.required, <any>Validators.pattern(emailRegex)]],
        user_address: ['', [<any>Validators.required, <any>Validators.minLength(4)]]
      });
    }
  }

  // gototabspage() {
  //   this.navCtrl.push(TabsPage);
  // }
  verify() {
    let user = { registered: false };
    // console.log(this.veri.value);

    this.auth.signup(this.veri.value).then((res) => {
      if (typeof res == "object") {
        if (res.success == true) {
          // console.log(res.message);
          user['details'] = this.veri.value;
          user['details']['id'] = res.id;
          this.veri.reset();
          this.auth.presentToast(res.message, 5000, "bottom", false);

          user.registered = true;

          this.storage.set('user', user).then((val) => {
            // console.log('Your name is', val);
            this.navCtrl.setRoot(TabsPage);
          });
        }

        else {
          // console.log(res.message);
          this.auth.presentToast(res.message, 5000, "bottom", false);
        }
      }
      else {
        // console.log(res);
        this.auth.presentToast(res, 5000, "bottom", false)
      }
    });
  }

}
