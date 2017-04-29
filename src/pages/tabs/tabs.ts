import { Component , ViewChild } from '@angular/core';
import {NavController,Platform,Tab,Tabs,ViewController,LoadingController} from 'ionic-angular';
import { ArticlePage } from '../article/article';
import { SettingsPage } from '../settings/settings';

import { RedditService } from '../../providers/reddit.service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('tabs') tabs: Tabs;
  @ViewChild('homeTab') tabRef: Tab;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = ArticlePage;
  tab2Root: any = SettingsPage;

  @ViewChild('search') search;

  constructor(private nav: NavController,platform: Platform ,  private d: RedditService) {

    // if(this.d.articleRepo == undefined){
    //   this.d.getPosts();
    // }

    // if(this.d.volunteerRepo == undefined){
    //   this.d.getvolunteer();
    // }

    platform.registerBackButtonAction(() => {
                  let tabNav=this.tabs.getActiveChildNav();
                if(this.nav.canGoBack()){
                  // this.nav.pop();
                  console.log(this.nav.getActive());
                  this.nav.removeView(this.nav.getActive()).then((res)=>{
                    console.log(res);
                  }).catch((err)=>{
                    console.log(err);
                  });
                }else{
                    if(tabNav['_views'].length > 1){
                        // this.tabs.viewCtrl['_nav'].pop();
                        console.log(tabNav.getActive());
                        // tabNav.getActive()
                        tabNav.removeView(tabNav.getActive()).then((res)=>{
                          console.log(res);
                        }).catch((err)=>{
                          console.log(err);
                        });
                    }else if(tabNav['_views'].length == 1){
                      platform.exitApp();
                    }
                }
          });

  }

  ionViewWillEnter() {

    //  if(this.d.articleRepo == undefined){
    //   this.d.getPosts();
    // }

    // if(this.d.volunteerRepo == undefined){
    //   this.d.getvolunteer();
    // }

  }

  clearAndClose(){
  //  console.log('hello');
    this.d.searchOpen=!this.d.searchOpen;
  }

  onInput(ev:any){
    // console.log(ev.target.value);
    let val=ev.target.value;
    this.d.searchvalue=val;
  }


  onFocus(ev:any){
    console.log(ev);
  }

  onCancel(ev:any){
      this.d.searchOpen = !this.d.searchOpen;
  }
}
