import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, PopoverController, Tabs, Platform } from 'ionic-angular';
import { RedditService } from '../../providers/reddit.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Http, Headers } from '@angular/http';
import { SocialSharing } from 'ionic-native';
import { Storage } from '@ionic/storage';

import { DetailsPage } from '../details/details';
import { PopoverPage } from '../popover/popover';
import { BlogPage } from '../blogpage/blogpage';
import { BlogpostPage } from '../blogpost/blogpost';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';
import { AboutPage } from '../about/about';
import { MyscrollsPage } from '../myscrolls/myscrolls';
import { MyvolunteersPage } from '../myvolunteers/myvolunteers';
import { TermsPage } from '../terms/terms';

import { SearchPipe } from '../../pipes/search';


@Component({
  selector: 'article',
  templateUrl: 'article.html'
})
export class ArticlePage {
  items: any;
  category: any;
  limit: any;
  loading: any;
  public loadingMoreData = false;
  public a = 10;
  public filterCount = 10;
  public filtered = false;
  public search;
  public selectedCity = '';
  public tabs: Tabs;

  constructor(public http: Http, public navCtrl: NavController, public platform: Platform, public storage: Storage, public navParams: NavParams, public dom: DomSanitizer, private redditService: RedditService, public popoverCtrl: PopoverController, public loadingCtrl: LoadingController) {
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

    SocialSharing.shareWithOptions(options).then((res) => {
      console.log(res);
    });
  }

  openSearch() {
    this.redditService.searchOpen = !this.redditService.searchOpen;
    this.search.setFocus();
  }

  openPage(item) {
    this.navCtrl.push(DetailsPage, {
      articles: item
    });
  }

  changeFocus() {
    // this.search.value='';
    if ((this.search.value == '' || this.search.value == null || this.search.value == undefined) && this.redditService.searchOpen == true) {
      this.redditService.searchOpen = !this.redditService.searchOpen;
    }

    return;
  }

  newpostblog() {
    this.navCtrl.push(BlogPage, {
      type: 'article'
    });
  }
  newblog() {
    this.navCtrl.push(BlogpostPage, {
      type: 'post'
    });
  }
  ngOnInit() {
    // this.getPosts();


    if (this.redditService.articleRepo != undefined && this.redditService.articleRepo.length != 0) {
      this.redditService.updateItems(this.a, 0).then((res) => {
        // this.loading.dismiss();
      });

    } else {
      // this.loading = this.loadingCtrl.create({
      //   spinner: 'bubbles',
      //   content: 'Please wait...'

      // });

      // this.loading.present();
      // this.redditService.getPosts().then((res) => {
      //   this.loading.dismiss();
      // }).catch(() => {
      //   this.loading.dismiss();
      // });


    }



  }



  // getPosts() {
  //   this.redditService.getPosts().then(response => {
  //     this.items = this.redditService.articleRepo;
  //     // console.log(this.items);
  //     if (this.items != undefined) {
  //       this.loading.dismiss();

  //     }
  //   });
  // }

  ionViewWillEnter() {

    this.redditService.getCities();

    this.selectedCity == "c.id";
    // console.log(this.selectedCity);
  }


  changeCategory() {
    // this.getPosts();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
     this.redditService.getPosts();

    if (this.redditService.articleRepo != undefined && this.redditService.articleRepo.length != 0) {
      
      console.log('if part');
      setTimeout(() => {
        console.log('Async operation has ended');
        this.a = 10;
        this.redditService.updateItems(this.a, 0);
        refresher.complete();
      }, 2000);
    } else {
      //  console.log('else part');
      refresher.complete();
      this.loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Please wait...'

      });

      this.loading.present();
      this.redditService.getPosts().then((res) => {
        this.loading.dismiss();
      }).catch(() => {
        this.loading.dismiss();
      });
    }
    


  }


  doInfinite(infiniteScroll) {

    if (this.loadingMoreData == true) {
      infiniteScroll.complete();
      return;
    }

    console.log('Begin async operation');
    if (this.redditService.items.length < this.redditService.articleRepo.length) {
      this.loadingMoreData = true;
      setTimeout(() => {
        let temp = this.a;


        if (this.filtered == true) {
          this.filterCount += 10;
          // this.filtering();
          // this.filtered=true;
        } else {
          this.a += 10;
          this.redditService.updateItems(this.a, 0);
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




}   
