import { NgModule, ErrorHandler , enableProdMode } from '@angular/core';
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

import { Storage } from '@ionic/storage';

import {Auth} from '../providers/auth';
import {RedditService} from '../providers/reddit.service';

export function provideStorage() {
  return new Storage(['sqlite', 'websql', 'indexeddb'], { name: 'jp' } /* optional config */);
}

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
    IonicModule.forRoot(MyApp,{tabsPlacement: 'top',tabsHideOnSubPages:true}),
    IonicImageLoader
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
  providers: [Auth,RedditService,{ provide: Storage, useFactory: provideStorage },{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
