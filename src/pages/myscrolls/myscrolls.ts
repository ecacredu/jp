import { Component } from '@angular/core';
import { NavController,LoadingController, NavParams } from 'ionic-angular';

import { RedditService } from '../../providers/reddit.service';

import { DetailsPage } from '../details/details';

import { Storage } from '@ionic/storage';
import { BlogPage } from '../blogpage/blogpage';


@Component({
  selector: 'page-myscrolls',
  templateUrl: 'myscrolls.html'
})
export class MyscrollsPage {
items: any;
loading: any;
currentUser:any;

  constructor(public navCtrl: NavController,public storage: Storage, public navParams: NavParams,public loadingCtrl: LoadingController, private redditService: RedditService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyscrollsPage');
  }
  
 ionViewWillEnter(){
    this.storage.get('user').then((val) => {
      //  console.log('Your name is', val);
       this.currentUser=val.details;
     })
  
    }

 openPage(item) {
    this.navCtrl.push(DetailsPage, {
      articles: item
    });
  }

  postScroll(){

    this.navCtrl.push(BlogPage, {
      type: 'article'
    });

  }

ngOnInit() {
    this.getPosts();

    this.loading = this.loadingCtrl.create({
       spinner: 'bubbles',
    content: 'Please wait...'
   
  });

  this.loading.present();

  setTimeout((data) => {
    this.loading.dismiss();
  }, 10000);
  
  }

getPosts(){
    this.redditService.getPosts().then(response => {
      this.items = response;
      console.log(this.items);
      if(this.items != undefined){
        this.loading.dismiss();
      }
     
    });
  }

doRefresh(refresher) {
    console.log('Begin async operation', refresher);
  this.getPosts();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }


}
