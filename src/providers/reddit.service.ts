import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, Request } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { OneSignal } from '@ionic-native/onesignal';
import { ToastController, LoadingController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

@Injectable()
export class RedditService {
    http: any;
    baseUrl: String;
    frontCity: any;
    public loading: any;
    public articleRepo: any;
    public volunteerRepo: any;
    public items: any;

    public posts: any;

    searchOpen = false;
    searchvalue = '';

    cities = [];

    citiesMajor = [{ id: "231234234", name: "All Cities" },
    { id: "2", name: "Delhi" },
    { id: "6", name: "Mumbai" },
    { id: "8", name: "Pune" },
    { id: "4", name: "Bengaluru" },
    { id: "5", name: "Chennai" }];

    constructor(http: Http, 
                private oneSignal: OneSignal, 
                private toastCtrl: ToastController, 
                public socialShare: SocialSharing,
                public loadingCtrl: LoadingController) {
        this.http = http;
        this.baseUrl = 'http://www.joinpolitics.in/application/';
    }

    updateItems(count, next) {
        let temp = [];
        // console.log('length : ' + this.articleRepo.length);
        // console.log('buyers : ' + this.verifiedBuyersData[0]);
        if (this.articleRepo.length > 0) {
            console.log('length > 0');
            if (count > this.articleRepo.length) {
                count = this.articleRepo.length;
            }

            for (let i = next; i < count; i++) {
                // console.log('key '+this.verifiedBuyersData[i].$key);
                temp.push(this.articleRepo[i]);
                // console.log(temp.length);
            }
            this.items = temp;
            return Promise.resolve(true);
            //  this.ref.detectChanges();
        } else {
            return Promise.resolve(false);
        }

    }

    updatePosts(count, next) {
        console.log("update post");
        let temp = [];
        // console.log('length : ' + this.volunteerRepo.length);
        // console.log('buyers : ' + this.verifiedBuyersData[0]);
        if (this.volunteerRepo.length > 0) {
            console.log('length > 0');
            if (count > this.volunteerRepo.length) {
                count = this.volunteerRepo.length;
            }
            for (let i = next; i < count; i++) {
                // console.log('key '+this.verifiedBuyersData[i].$key);
                temp.push(this.volunteerRepo[i]);
                // console.log(temp.length);
            }
            this.posts = temp;
            return Promise.resolve(true);
            //  this.ref.detectChanges();
        } else {
            return Promise.resolve(false);
        }

    }


    getPosts() {
        if(this.loading != undefined){
            this.loading.dismiss();
        }
        
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Please wait...'

        });

        this.loading.present();
        return this.http.get(this.baseUrl + 'articles.php')
            .toPromise().then((result: Response) => {
                const data = result.json();
                this.articleRepo = data;
                if (this.items == undefined) {
                    this.updateItems(10, 0).then((err) => {
                        this.loading.dismiss();
                    });
                }else{
                    this.loading.dismiss();
                }
                return data;
            }).catch((err) => {
                this.loading.dismiss();
            });
    }

    getCities() {
        this.http.get(this.baseUrl + 'city-list-all.php')
            .toPromise().then((result: Response) => {
                const data = result.json();
                this.cities = data;
            });
    }

    getvolunteer() {
        return this.http.get(this.baseUrl + 'city-all.php')
            .toPromise().then((result: Response) => {
                const data = result.json();
                this.volunteerRepo = data;
                if (this.posts == undefined) {
                    this.updatePosts(10, 0);
                }
                return data;
            });
    }


    getComments(type: any, id: any): any {
        if (type = 'article') {
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            let sentData = 'postId=' + id;
            // console.log('id is '+id)
            return this.http.post('http://joinpolitics.in/application/bcomments.php', sentData, {
                headers: headers
            }).toPromise().then(res => {
                return res.json();
            });
        }
    }

    getvolunteerComments(type: any, id: any): any {
        if (type = 'volunteer') {
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            let sentData = 'postId=' + id;
            // console.log('id is '+id)
            return this.http.post('http://joinpolitics.in/application/test.php', sentData, {
                headers: headers
            }).toPromise().then(res => {
                return res.json();
            });
        }
    }

    postArticle(form) {

        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Please wait...'
        });

        this.loading.present();

        let url = 'http://joinpolitics.in/application/admin/create-post.php';

        let head = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.post(url, JSON.stringify(form), { headers: head })
            .toPromise().then(res => {
                // console.log(res.json());
                const data = res.json();

                this.loading.dismiss();

                return data[0];
            }).catch((err) => {
                //   console.log(err);

                this.loading.dismiss();

                return err;
            });

    }

    postVolunteer(form) {

        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Please wait...'
        });

        this.loading.present();

        let url = 'http://joinpolitics.in/application/admin/blogpost.php';

        let head = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.post(url, JSON.stringify(form), { headers: head })
            .toPromise().then(res => {
                // console.log(res.json());
                const data = res.json();

                this.loading.dismiss();

                return data[0];
            }).catch((err) => {
                //   console.log(err);

                this.loading.dismiss();

                return err;
            });

    }

    postComment(type, commentform) {

        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Please wait...'
        });

        this.loading.present();

        console.log('function called!');
        let url;

        if (type == 'article') {
            url = 'http://joinpolitics.in/application/postBlogComment.php';
        } else if (type == 'volunteer') {
            url = 'http://joinpolitics.in/application/postVolunteerComment.php';
        }



        let head = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.post(url, JSON.stringify(commentform), { headers: head })
            .toPromise().then(res => {
                // console.log(res.json());
                const data = res.json();

                this.loading.dismiss();

                return data[0];
            }).catch((err) => {
                //   console.log(err);

                this.loading.dismiss();

                return err;
            });

    }

    presentToast(message, duration, position, showClose) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: duration,
            position: position,
            showCloseButton: showClose
        });
        toast.present();
    }

    shareArticle(type, title, message, image, url) {
        var options = {
            message: message,
            subject: title,
            url: url,// details?id=
        }


        if (type == 'fb') {

            this.socialShare.shareViaFacebook(message, image, url).then((res) => {
                console.log(res);
            });

        } else if (type == 'twitter') {

            this.socialShare.shareViaTwitter(message, image, url).then((res) => {
                console.log(res);
            });

        } else if (type == 'general') {

            this.socialShare.shareWithOptions(options).then((res) => {
                console.log(res);
            });

        }

    }

    initOneSignal(){
        this.oneSignal.startInit('b225e6d8-cde5-4fbf-bd57-7fe7cb449727', '188398867187');

        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

        this.oneSignal.handleNotificationReceived().subscribe(() => {
        // do something when notification is received
        });

        this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
        });

        this.oneSignal.endInit();
    }


}