import { Component } from '@angular/core';
import { NavController , NavParams , ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';

import { RedditService } from '../../providers/reddit.service';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { DomSanitizer } from '@angular/platform-browser';

import { Storage } from '@ionic/storage';

declare var cordova: any;
@Component({
  selector: 'page-blogpost',
  templateUrl: 'blogpost.html'
})
export class BlogpostPage {

 lastImage: string = null;
  loading: Loading;
  selectedImage:string;
  postTitle='';
  postContent='';
  postLink='';
  events='';
  contact='';
  currentUser:any;
  public type='';
  public selectedCity='';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage, 
              public camera: Camera,
              public file: File,
              public transfer: Transfer,
              public filePath: FilePath,
              public dom: DomSanitizer, 
              private redditService: RedditService, 
              public actionSheetCtrl: ActionSheetController, 
              public toastCtrl: ToastController, 
              public platform: Platform, 
              public loadingCtrl: LoadingController) {}
 

 ionViewWillEnter(){
   this.type=this.navParams.get('type');
    this.storage.get('user').then((val) => {
      //  console.log('Your name is', val);
       this.currentUser=val.details;
     })
     this.redditService.getCities();
    }

  post(){

    let form={
      type:this.type,
      city_id:parseInt(this.selectedCity),
      user_id:this.currentUser.id,
      post_title:this.postTitle,
      post_description:'<p>'+this.postContent+'</p>',
      post_picture:this.selectedImage,
      post_status:0,
      post_video_link:this.postLink,
      events:this.events,
      contact:this.contact +''
    };

    console.log(form);

    this.redditService.postVolunteer(form).then((res)=>{
      if(typeof res == "object"){
        if(res.success==true){
          // console.log(res.message);
            
          this.redditService.presentToast(res.message,5000,"bottom",false);
          this.selectedImage='';
          this.postTitle='';
          this.postContent='';
          this.postLink='';
          this.selectedCity='';
          this.events='';
          this.contact='';
        }

        else{
          // console.log(res.message);
           this.redditService.presentToast(res.message,5000,"bottom",false);
        }
      }
      else{
        // console.log(res);
         this.redditService.presentToast(res,5000,"bottom",false)
      }
    })

  }



  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

public takePicture(sourceType) {
  // Create options for the Camera Dialog
  var options = {
    sourceType: sourceType,
    destinationType:this.camera.DestinationType.DATA_URL
  };
 
  // Get the data of an image
  this.camera.getPicture(options).then((imagePath) => {

    this.selectedImage='data:image/*;base64,'+imagePath;
    // console.log(this.selectedImage);
    // Special handling for Android library
    // if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
    //   FilePath.resolveNativePath(imagePath)
    //   .then(filePath => {
    //       let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
    //       let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
    //     this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    //   });
    // } else {
    //   var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
    //   var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
    //   this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    // }
  }, (err) => {
    this.presentToast('Error while selecting image.');
  });
}
// Create a new name for the image
private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}
 
// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
  }, error => {
    this.presentToast('Error while storing file.');
  });
}
 
private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}
 
// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}
public uploadImage() {
  // Destination URL
  var url = "http://joinpolitics.in/upload/post";

  let time = (new Date).getTime();
 
  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);
 
  // File name only
  var filename = 'big'+time+'_'+this.lastImage;
 
  let options: FileUploadOptions = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': filename}
  };
 
  const fileTransfer: TransferObject = this.transfer.create();
 
  this.loading = this.loadingCtrl.create({
    spinner: 'bubbles',
    content: 'Uploading...',
  });
  this.loading.present();
 
  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
    this.loading.dismissAll()
    this.presentToast('Image succesful uploaded.');
  }, err => {
    console.log(err);
    this.loading.dismissAll()
    this.presentToast('Error while uploading file.');
  });
}


}
