import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import {RedditService} from '../../providers/reddit.service';

import { FullpostPage } from '../fullpost/fullpost';

import { Storage } from '@ionic/storage';
import { BlogpostPage } from '../blogpost/blogpost';


@Component({
  selector: 'page-myvolunteers',
  templateUrl: 'myvolunteers.html'
})
export class MyvolunteersPage {

  posts: any;
  items: any;
  loading: any;
currentUser:any;
  constructor(public navCtrl: NavController,public storage: Storage,private redditService:RedditService, public navParams: NavParams,public loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyvolunteersPage');
  }
  ionViewWillEnter(){
    this.storage.get('user').then((val) => {
      //  console.log('Your name is', val);
       this.currentUser=val.details;
     })
    }
openPage(item){
   this.navCtrl.push(FullpostPage, {
    volunteers: item
   });
 }
   ngOnInit(){
   this.getvolunteer();

    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
    content: 'Please wait...'
  });

  this.loading.present();

  setTimeout(() => {
    this.loading.dismiss();
  }, 10000);

}
  getvolunteer(){
    this.redditService.getvolunteer().then(response => {
      this.posts = response;

       if(this.posts != undefined){
        this.loading.dismiss();
      }
    });
  }

  postVolunteer(){
   this.navCtrl.push(BlogpostPage, {
    type:'post'
   });
 }

doRefresh(refresher) {
    console.log('Begin async operation', refresher);
   this.getvolunteer();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
