import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormGroup,Validators, FormBuilder } from '@angular/forms';

import { SignupPage } from '../signup/signup';
import {PolicyPage} from '../policy/policy';
import { TabsPage } from '../tabs/tabs';

import { Auth } from '../../providers/auth';

import { Storage } from '@ionic/storage';

declare var AccountKitPlugin: any;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
num:any;
 veri: FormGroup;
  constructor(public navCtrl: NavController,public storage: Storage,public auth:Auth, public navParams: NavParams,public formBuilder: FormBuilder) {
    this.veri = this.formBuilder.group({
      PhoneNo: ['',[<any>Validators.required, <any>Validators.minLength(10),<any>Validators.maxLength(10)]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
 gototabspage(){
    this.navCtrl.push(TabsPage);
  }

  verify(){
    // console.log(this.veri.value.PhoneNo);
    
let options = {
          defaultCountryCode: "IN",
          facebookNotificationsEnabled: true,
          initialPhoneNumber: ["91", this.veri.value.PhoneNo]
        };
        AccountKitPlugin.loginWithPhoneNumber(options, (res) => {
              AccountKitPlugin.getAccount((res) => {
                // console.log(options.initialPhoneNumber + " " + res.phoneNumber);
                AccountKitPlugin.logout();
                let number = res.phoneNumber.substring(3);
                // console.log(number);
                //http call
                let form={'user_mobile':number};

                this.auth.checkIfExists(form).then((res)=>{

                  if(typeof res == 'object'){

                      if(res.success ==true && res.exists ==true){
                          // console.log(JSON.stringify(res));
                          this.storage.get('user').then((userres)=>{
                                  let tempUser={registered:true,details:res.details[0]};
                                  this.storage.set('user',tempUser).then((val)=>{
                                      this.navCtrl.setRoot(PolicyPage);   //policypage is blank page which redirect to tabs page
                                  });
                          });
                          this.auth.presentToast("Welcome Back",3000,'bottom',false);
                      }else if(res.success ==true && res.exists ==false){
                          this.navCtrl.setRoot(SignupPage,{
                            number:number
                          });
                      }
                  }else{
                      // console.log(res);
                      this.auth.presentToast(res,3000,'bottom',false);
                  }

                }).catch((err)=>{
                    // console.log(err);
                    this.auth.presentToast(err,3000,'bottom',false);
                });

              
              }, (err) => {
                console.log("Failed to get account with :" + err);
              });

            }, (err) => {
              console.log("Failed with :" + err);
            });

  }
}
