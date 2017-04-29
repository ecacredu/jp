import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RedditService } from '../../providers/reddit.service';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-fullpost',
  templateUrl: 'fullpost.html'
})
export class FullpostPage {
   item: any;
    volunteer : any;
    comments;
    todo:any;
    currentUser:any;
    url:SafeResourceUrl;
    constructor(public navCtrl: NavController,public sanitizer:DomSanitizer,public params:NavParams,public storage: Storage,public reddit:RedditService) {
      
      this.todo='';
        this.volunteer = params.get("volunteers");
        console.log(this.volunteer)
       // this.volunteer.postvideolink = "https://www.youtube.com/embed/"+this.volunteer.postvideolink.split("v=")[1];
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+this.volunteer.postvideolink.split("v=")[1]); 
        this.comments = reddit.getvolunteerComments('volunteer',this.volunteer.id);
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
      post_id:this.volunteer.id,
      user_id:this.currentUser.id,
      client_name:this.currentUser.user_name,
      client_email:this.currentUser.user_email,
      contact:this.currentUser.user_mobile,
      client_comments:this.todo,
      clients_status:1
  }
  this.reddit.postComment('volunteer',comments)
  .then((res)=>{
      if(typeof res == "object"){
        if(res.success==true){
          // console.log(res.message);
            this.comments = this.reddit.getvolunteerComments('volunteer',this.volunteer.id);
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

    var html = this.volunteer.title+'\n\n'+this.volunteer.content;
    var div = document.createElement("div");
    div.innerHTML = html;
    var text = div.textContent || div.innerText || "";

    var trimmedString = text.substring(0, 150)+'...';

    this.reddit.shareArticle(type,this.volunteer.title,trimmedString,this.volunteer.image,'https://play.google.com/store/apps/details?id=com.joinpoliticsnow');


  }


}
