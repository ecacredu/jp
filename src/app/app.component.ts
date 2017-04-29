import { Component , ViewChild } from '@angular/core';
import { Platform , NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import {DetailsPage} from '../pages/details/details';
import { SettingsPage } from '../pages/settings/settings';
import { PopoverPage } from '../pages/popover/popover';
import { TabsPage } from '../pages/tabs/tabs';
import { BlogPage } from '../pages/blogpage/blogpage';
import { BlogpostPage } from '../pages/blogpost/blogpost';
import { FullpostPage } from '../pages/fullpost/fullpost';
import { ProfilePage } from '../pages/profile/profile';
import { MyscrollsPage } from '../pages/myscrolls/myscrolls';
import { TermsPage } from '../pages/terms/terms';
import { PolicyPage } from '../pages/policy/policy';

import {RedditService} from '../providers/reddit.service';

import { Storage } from '@ionic/storage';
import { ImageLoaderConfig } from 'ionic-image-loader';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
   rootPage:any ;
   @ViewChild('rootNav') nav: NavController;

  constructor(platform: Platform , public reddit:RedditService,storage: Storage,private imageLoaderConfig: ImageLoaderConfig) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.imageLoaderConfig.setFallbackUrl('assets/img/placeholder.png');
      this.imageLoaderConfig.setCacheDirectoryName('jp-cache');

      this.reddit.getPosts();
      this.reddit.getvolunteer();
      storage.get('user').then((val) => {
       console.log('Your name is', val);
       if(val!=null && val!=undefined){
         if(val.registered==null || val.registered==undefined || val.registered==false){
          this.rootPage = LoginPage;
         }
         else if(val.registered==true){

           this.rootPage = TabsPage;
           
         }
       }
       else{
          this.rootPage = LoginPage;
       }
     })

      // this.rootPage=TabsPage;
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
