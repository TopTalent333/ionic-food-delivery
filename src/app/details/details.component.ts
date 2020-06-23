import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item, MenuItem, MenuItemCart } from '../models/item';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ToastController, PopoverController, Platform, LoadingController } from '@ionic/angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Device } from '@ionic-native/device/ngx';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  receivedData: any;
  selectedMenuItems: MenuItemCart[] = [];

  constructor(
    private route: ActivatedRoute, private router: Router,
    private socialSharing: SocialSharing, private toastCtrl: ToastController,
    private androidPermissions: AndroidPermissions,
    private callNumber: CallNumber,
    private device: Device,
    private iab: InAppBrowser
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.receivedData = this.router.getCurrentNavigation().extras.state.selected;
      }
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.receivedData = this.router.getCurrentNavigation().extras.state.selected;
      }
    });
  }

  addToCart(menuItemSelected) {
    this.receivedData.offers.forEach(element => {
      if (element.id === menuItemSelected.id) {
        element.quantity = element.quantity + 1;
      }
    });
  }

  removeFromCart(menuItemSelected) {
    this.receivedData.offers.forEach(element => {
      if (element.id === menuItemSelected.id) {
        element.quantity = 0;
      }
    });
  }

  confirmBuy() {
    const itemsToBuy = [];
    this.receivedData.offers.forEach(element => {
      if (element.quantity > 0) {
        itemsToBuy.push(element);
      }
    });
    console.log(itemsToBuy);
  }

  heart() {
    this.receivedData.likes = this.receivedData.likes + 1;
  }

  navigate() {
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
      .then(
        () => {
          let url = 'http://maps.google.com/maps';
          if (this.device.platform.toLowerCase() === 'ios') {
            url = 'maps://maps.apple.com/';
          }
          url = url + '?q=' + this.receivedData.address + ', Salto, Buenos Aires';
          // window.location.href = url;
          const browser = this.iab.create(url, '_blank', 'location=yes');
          browser.on('loadstart').subscribe((event: InAppBrowserEvent) => {
            const closeUrl = 'https://www.dreamvisionary.com/thankyou';
            if (event.url === closeUrl) {
              browser.close();
            }
          });
          // window.location.href = 'maps://maps.apple.com/?q=' + this.receivedData.address + ', Salto, Buenos Aires';
        },
        error => {
          this.showOnceToast('No has otorgado permisos para GPS.');
        }
      );
  }

  call() {
    this.callNumber.callNumber(this.receivedData.phone, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  share() {
    const msg = this.receivedData.name + ' ' + this.receivedData.phone + ' ' + this.receivedData.address;
    this.socialSharing.share(msg, null).then(() => {
      console.log('shared');
    }).catch((e) => {
      this.showOnceToast('No has otorgado permisos para compartir.');
    });
  }

  showOnceToast(msg: string) {
    this.toastCtrl.dismiss().then((obj) => {
    }).catch(() => {
    }).finally(() => {
      this.presentToast(msg);
    });
  }

  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: 'bottom',
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            console.log('Close clicked');
          }
        }
      ]
    });

    await toast.present();
  }
}
