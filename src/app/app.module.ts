import { NgModule, ErrorHandler , enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
enableProdMode();
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ArticlePage } from '../pages/article/article';
import { SettingsPage } from '../pages/settings/settings';
import {DetailsPage} from '../pages/details/details';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { PopoverPage } from '../pages/popover/popover';
import { BlogPage } from '../pages/blogpage/blogpage';
import { BlogpostPage } from '../pages/blogpost/blogpost';
import { FullpostPage } from '../pages/fullpost/fullpost';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
import { PolicyPage } from '../pages/policy/policy';
import { MyscrollsPage } from '../pages/myscrolls/myscrolls';
import { MyvolunteersPage } from '../pages/myvolunteers/myvolunteers';
import { TermsPage } from '../pages/terms/terms';

import { IonicImageLoader } from 'ionic-image-loader';


import { SearchPipe } from '../pipes/search';
import { CurrentUserPipe } from '../pipes/currentUser';
import { CityPipe } from '../pipes/city';

import { IonicStorageModule } from '@ionic/storage';

import {Auth} from '../providers/auth';
import {RedditService} from '../providers/reddit.service';
import { OneSignal } from '@ionic-native/onesignal';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// export function provideStorage() {
//   return new Storage({ name: 'jp' } /* optional config */);
// }

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ArticlePage,
    SearchPipe,
    CurrentUserPipe,
    CityPipe,
    SettingsPage,
    DetailsPage,
    LoginPage,
    SignupPage,
    PolicyPage,
    PopoverPage,
    BlogPage,
    BlogpostPage,
    FullpostPage,
    ProfilePage,
    MyscrollsPage,
    MyvolunteersPage,
    TermsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{tabsPlacement: 'top',tabsHideOnSubPages:true}),
    IonicImageLoader.forRoot(),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ArticlePage,
    SettingsPage,
    DetailsPage,
    LoginPage,
    SignupPage,
    PopoverPage,
    PolicyPage,
    BlogPage,
    BlogpostPage,
    FullpostPage,
    ProfilePage,
    MyscrollsPage,
    MyvolunteersPage,
    TermsPage,
    TabsPage
  ],
  providers: [Auth,RedditService,StatusBar,SplashScreen,SocialSharing,File,Camera,Transfer,FilePath,OneSignal,{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
