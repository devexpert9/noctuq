import { Injectable } from '@angular/core';
import { Http, Headers, Response,RequestOptions, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController, LoadingController } from '@ionic/angular';
import * as CryptoJS from 'crypto-js';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
@Injectable({
  providedIn: 'root'
})
export class UserService {
loading:any;
  constructor(private http: Http, public toastController: ToastController, public loadingController: LoadingController) { }

  postData(data,endpoint){

    return this.http.post(endpoint , data).map((responseData) => {
        return responseData.json();
    }, error => {
     	return error.json();
  	});
  }

  getData(endpoint){
    return this.http.get(endpoint).map((responseData) => {
        return responseData.json();
    }).catch((error: any) => {
	    return Observable.throw(new Error(error.status));
	});
  }

  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color,
      showCloseButton: true
    });
    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create();
    await this.loading.present();
  }

  async stopLoading() {
    if(this.loading != undefined){
      await this.loading.dismiss();
    }
    else{
      var self = this;
      setTimeout(function(){
        self.stopLoading();
      },1000);
    }
  }

  encryptData(data,salt) {
	    try {
	        var enc = CryptoJS.AES.encrypt(JSON.stringify(data), salt).toString();
	        enc = enc.split('+').join('xMl3Jk').split('/').join('Por21Ld').split('=').join('Ml32');
	        return enc;
	    } catch (e) {
	        return 0;
	    }
	}

	decryptData(data,salt) {
	    try { 
	        data = data.split('xMl3Jk').join('+').split('Por21Ld').join('/').split('Ml32').join('=');
	        const bytes = CryptoJS.AES.decrypt(data, salt);
	        if (bytes.toString()) {
	            var dec = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	            return dec;
	        }
	        return data;
	    } catch (e) {
	        return 0;
	    }
	}
}
