import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, Request } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { ToastController, LoadingController } from 'ionic-angular';

/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Auth {
  loading:any;
  constructor(public http: Http,private toastCtrl: ToastController,public loadingCtrl: LoadingController) {
    console.log('Hello Auth Provider');
  }

signup(form){

 this.loading = this.loadingCtrl.create({
    spinner: 'bubbles',
    content: 'Please wait...'
  });

  this.loading.present();

    console.log('function called!');
        
            let url = 'http://joinpolitics.in/application/admin/create-user.php';
           
            let head = new Headers({
                'Content-Type': 'application/json'
            });

            return this.http.post(url, JSON.stringify(form), { headers: head })
                .toPromise().then(res=>{
                    // console.log(res.json());
                    const data = res.json();
                      
                       this.loading.dismiss();
                      
                    return data[0];
                }).catch((err)=>{
                  // console.log(err);
                  
                       this.loading.dismiss();
                      
                  return err;
                });
      
      }

      updateUser(form){

 this.loading = this.loadingCtrl.create({
    spinner: 'bubbles',
    content: 'Please wait...'
  });

  this.loading.present();

        
            let url = 'http://joinpolitics.in/application/admin/edit-user.php';
           
            let head = new Headers({
                'Content-Type': 'application/json'
            });

            return this.http.post(url, JSON.stringify(form), { headers: head })
                .toPromise().then(res=>{
                    // console.log(res.json());
                    const data = res.json();
                      
                       this.loading.dismiss();
                      
                    return data[0];
                }).catch((err)=>{
                  // console.log(err);
                  
                       this.loading.dismiss();
                      
                  return err;
                });
      
      }

      checkIfExists(form){

           this.loading = this.loadingCtrl.create({
          spinner: 'bubbles',
          content: 'Please wait...'
        });

        this.loading.present();

          let url = 'http://joinpolitics.in/application/admin/checkIfUserExists.php';
           
            let head = new Headers({
                'Content-Type': 'application/json'
            });

            return this.http.post(url, JSON.stringify(form), { headers: head })
                .toPromise().then(res=>{
                    // console.log(res.json());
                    const data = res.json();
                      
                      this.loading.dismiss();
                      
                    return data[0];
                }).catch((err)=>{
                  // console.log(err);
                  
                      this.loading.dismiss();
                      
                  return err;
                });

      }


  presentToast(message,duration,position,showClose) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position,
      showCloseButton: showClose
    });
    toast.present();
  }

}


