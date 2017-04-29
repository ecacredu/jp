import { Component } from '@angular/core';
import { NavController, NavParams,ToastController, LoadingController} from 'ionic-angular';
import { SocialSharing } from 'ionic-native';
import { RedditService } from '../../providers/reddit.service';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';

import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'details.html'
})
export class DetailsPage {
    item: any;
    article : any;
    comments:any;
    todo:any;
    currentUser:any;
    url:SafeResourceUrl;
    constructor(public reddit:RedditService,public navCtrl: NavController,public sanitizer:DomSanitizer, public params:NavParams,public storage: Storage,private toastCtrl: ToastController,public loadingCtrl: LoadingController) {

        this.todo='';
        this.article = params.get("articles");
        // console.log(JSON.stringify(this.article));
         this.url = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+this.article.postvideolink.split("v=")[1]);

        this.comments = reddit.getComments('article',this.article.id);
        // console.log(this.comments);
        
      

    }

    ionViewWillEnter(){
          this.storage.get('user').then((val) => {
      //  console.log('Your name is', val);
       this.currentUser=val.details;
     })
    }
    postComment(){
  // console.log(this.todo);
  let comments={
      post_id:this.article.id,
      user_id:this.currentUser.id,
      client_name:this.currentUser.user_name,
      client_email:this.currentUser.user_email,
      contact:this.currentUser.user_mobile,
      client_comments:this.todo,
      clients_status:1
  }
  this.reddit.postComment('article',comments)
  .then((res)=>{
      if(typeof res == "object"){
        if(res.success==true){
          // console.log(res.message);
        this.comments = this.reddit.getComments('article',this.article.id);
            
        this.reddit.presentToast(res.message,5000,"bottom",false);

        
        
        }

        else{
          // console.log(res.message);
           this.reddit.presentToast(res.message,5000,"bottom",false);
        }
      }
      else{
        // console.log(res);
         this.reddit.presentToast(res,5000,"bottom",false)
      }
    });
  }
  
  share(type){

    var html =  this.article.title+'\n\n'+this.article.content;
    var div = document.createElement("div");
    div.innerHTML = html;
    var text = div.textContent || div.innerText || "";

    var trimmedString = text.substring(0, 150)+'...';

    this.reddit.shareArticle(type,this.article.title,trimmedString,this.article.image,'https://play.google.com/store/apps/details?id=com.joinpoliticsnow');


  }

}
