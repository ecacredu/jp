import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login/login';
import { MyscrollsPage } from '../myscrolls/myscrolls';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  currentUser:any;

  constructor(public navCtrl: NavController, public auth:Auth,public storage: Storage, public navParams: NavParams,public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  ionViewWillEnter(){
    this.storage.get('user').then((val) => {
      //  console.log('Your name is', val);
       this.currentUser=val.details;
     })
    }

 showPrompt(titlevalue,name,typevalue) {
    let prompt = this.alertCtrl.create({
      title: titlevalue,
      message: "Enter your "+name,
      inputs: [
        {
          name: 'Name',
          placeholder: titlevalue,
          type:typevalue
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log(name+'->'+data.Name);

            if(name=='name'){
                this.updateUser('user_name',data.Name);
            }else if(name=='email'){
                this.updateUser('user_email',data.Name);
            }
            else if(name=='city'){
                this.updateUser('user_address',data.Name);
            }
          }
        }
      ]
    });
    prompt.present();
  }


  updateUser(field , value){

    this.currentUser[field]=value;
    // console.log(this.currentUser);

    this.auth.updateUser(this.currentUser).then((res)=>{

      if(typeof res == 'object'){

                      if(res.success ==true){
                          // console.log(JSON.stringify(res));
                          this.storage.get('user').then((userres)=>{
                                  let tempUser={registered:true,details:res.details[0]};
                                  this.storage.set('user',tempUser).then((val)=>{
                                      this.currentUser=val.details;
                                      this.auth.presentToast("Updated",3000,'bottom',false);
                                  });
                          });
                          
                      }else if(res.success ==false){
                          this.auth.presentToast(res.message,3000,'bottom',false);
                      }
                  }else{
                      // console.log(res);
                      this.auth.presentToast(res,3000,'bottom',false);
                  }

    });

  }



  // logoutConfirm() {
  //   let alert = this.alertCtrl.create({
  //     title: 'Confirm Logout',
  //     message: 'Are you sure you want to logout ?',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Logout',
  //         handler: () => {
  //           this.storage.remove('user').then((res)=>{
  //             this.navCtrl.setRoot(LoginPage);
  //           });
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

 }