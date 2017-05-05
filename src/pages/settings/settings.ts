import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, Platform, Tabs } from 'ionic-angular';
import { RedditService } from '../../providers/reddit.service';
import { ArticlePage } from '../article/article';
import { PopoverPage } from '../popover/popover';
import { PopoverController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { FullpostPage } from '../fullpost/fullpost';
import { BlogPage } from '../blogpage/blogpage';
import { BlogpostPage } from '../blogpost/blogpost';
import { ProfilePage } from '../profile/profile';
import { SearchPipe } from '../../pipes/search';
import { SocialSharing } from '@ionic-native/social-sharing';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { MyscrollsPage } from '../myscrolls/myscrolls';
import { MyvolunteersPage } from '../myvolunteers/myvolunteers';
import { TermsPage } from '../terms/terms';


@Component({
  selector: 'settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  posts: any;
  items: any;
  loading: any;
  public a = 10;
  public loadingMoreData = false;
  public filterCount = 10;
  public filtered = false;

  public tabs: Tabs;
  public search;

  constructor(public navCtrl: NavController,public socialShare:SocialSharing, public platform: Platform, public storage: Storage, public dom: DomSanitizer, public navParams: NavParams, private redditService: RedditService, public popoverCtrl: PopoverController, public loadingCtrl: LoadingController) {
    // this.getDefaults();
    this.search = navParams.data;
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss((data) => {
      this.platform.registerBackButtonAction(() => {
        this.tabs = this.navCtrl.parent;
        let tabNav = this.tabs.getActiveChildNav();
        if (this.navCtrl.canGoBack()) {
          // this.navCtrl.pop();
          console.log(this.navCtrl.getActive());
          this.navCtrl.removeView(this.navCtrl.getActive()).then((res) => {
            console.log(res);
          }).catch((err) => {
            console.log(err);
          });
        } else {
          if (tabNav['_views'].length > 1) {
            // this.tabs.viewCtrl['_nav'].pop();
            console.log(this.tabs.viewCtrl['_nav'].getActive());
            this.tabs.viewCtrl['_nav'].removeView(this.tabs.viewCtrl['_nav'].getActive()).then((res) => {
              console.log(res);
            }).catch((err) => {
              console.log(err);
            });
          } else if (tabNav['_views'].length == 1) {
            this.platform.exitApp();
          }
        }
      });
      if (data != null) {
        if (data.profile) {
          this.navCtrl.push(ProfilePage);
        }
        if (data.close) {
          console.log('popOver close');
        }
        if (data.logout) {
          this.storage.remove('user').then((res) => {

            this.navCtrl.push(LoginPage).then(() => {
              const index = this.navCtrl.getActive().index;
              this.navCtrl.remove(0, index);
            });

          });
        }

        if (data.myscrolls) {
          this.navCtrl.push(MyscrollsPage);
        }
        if (data.myvolunteers) {
          this.navCtrl.push(MyvolunteersPage);
        }
        if (data.terms) {
          this.navCtrl.push(TermsPage);
        }
      }
    });
  }


  shareApp() {
    var options = {
      message: 'Join Politics',
      subject: 'Check out this new app called join politics',
      url: 'https://play.google.com/store/apps/details?id=com.joinpoliticsnow',// details?id=
      chooserTitle: 'Pick an app'
    }

    this.socialShare.shareWithOptions(options).then((res) => {
      console.log(res);
    });
  }

  openPage(item) {
    this.navCtrl.push(FullpostPage, {
      volunteers: item
    });
  }
  ngOnInit() {


    if (this.redditService.volunteerRepo != undefined && this.redditService.volunteerRepo.length != 0) {
      this.redditService.updatePosts(this.a, 0).then((res) => {
        // this.loading.dismiss();
      });

    } else {
      this.loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Please wait...'

      });

      this.loading.present();
      this.redditService.getvolunteer().then(() => {
        this.loading.dismiss();
      }).catch(() => {
        this.loading.dismiss();
      });
    }

  }

  openSearch() {
    this.redditService.searchOpen = !this.redditService.searchOpen;
    this.search.setFocus();
  }

  changeFocus() {
    // this.search.value='';
    if ((this.search.value == '' || this.search.value == null || this.search.value == undefined) && this.redditService.searchOpen == true) {
      this.redditService.searchOpen = !this.redditService.searchOpen;
    }

    return;
  }



  // getvolunteer(){
  //   this.redditService.getvolunteer().then(response => {
  //     this.posts = response;

  //      if(this.posts != undefined){
  //       this.loading.dismiss();
  //     }
  //   });
  // }

  newblog() {
    this.navCtrl.push(BlogpostPage, {
      type: 'post'
    });
  }
  newpostblog() {
    this.navCtrl.push(BlogPage, {
      type: 'article'
    });
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

     this.redditService.getvolunteer();
    if (this.redditService.volunteerRepo != undefined && this.redditService.volunteerRepo.length != 0) {
      if (this.filtered == true) {
        this.filterCount = 10;
        this.filtering();
        this.filtered = true;
      } else {
       
        this.filtered = false;
        this.filterCount = 10;
      }
      setTimeout(() => {
        console.log('Async operation has ended');
         this.a = 10;
        this.redditService.updatePosts(this.a, 0);
        refresher.complete();
      }, 2000);
    } else {
      this.loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Please wait...'

      });

      this.loading.present();
      this.redditService.getvolunteer().then(() => {
        this.loading.dismiss();
      }).catch(() => {
        this.loading.dismiss();
      });
    }


  }

  cityChange(ev: any) {
    // Reset items back to all of the items

    // set val to the value of the searchbar
    // let val = ev.target.value;
    console.log(ev);
    // if the value is an empty string don't filter the items


    if (ev != undefined && ev != null && ev != '') {
      this.filterCount = 10;
      this.filtering();
    } else {
      this.redditService.updatePosts(this.a, 0);
      this.filtered = false;
      this.filterCount = 10;
    }
  }

  doInfinite(infiniteScroll) {

    if (this.loadingMoreData == true) {
      infiniteScroll.complete();
      return;
    }

    console.log('Begin async operation');

    if (this.redditService.posts.length < this.redditService.volunteerRepo.length) {
      this.loadingMoreData = true;
      setTimeout(() => {
        let temp = this.a;


        if (this.filtered == true) {
          this.filterCount += 10;
          this.filtering();
          this.filtered = true;
        } else {
          this.a += 10;
          this.redditService.updatePosts(this.a, 0);
          this.filtered = false;
          this.filterCount = 10;
        }

        console.log('Async operation has ended');
        this.loadingMoreData = false;
        infiniteScroll.complete();
      }, 500);

    } else {

      infiniteScroll.complete();
      this.loadingMoreData = false;
    }
  }

  filtering() {
    let temp = this.redditService.posts;
    console.log('before filtering' + temp.length);
    temp = this.filterList(this.filterCount).filter((item) => {
      if(item == undefined){
        return;
      }
      return ((item.cityid == undefined || item.cityid == this.redditService.frontCity || this.redditService.frontCity == undefined || this.redditService.frontCity == null || this.redditService.frontCity == '231234234'));
    });
    console.log('After filtering' + temp.length);
    this.filtered = true;
    this.redditService.posts = temp;

  }

  filterList(count) {

    let tf = [];
    for (let i = 0; i < count; i++) {
      tf.push(this.redditService.volunteerRepo[i]);
    }
    console.log('returning' + tf.length);
    return tf;
  }

}
