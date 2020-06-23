import { Component, NgZone } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private toastCtrl: ToastController,
    private router: Router,
    private zone: NgZone,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.subscribeBackButton();
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 1500);
    });
  }

  subscribeBackButton() {
    let lastTimeBackPress = 0;
    const timePeriodToExit = 2000;

    this.platform.backButton.subscribeWithPriority(1, () => {
      if ((this.router.isActive('', true) && this.router.url === '') ||
        (this.router.isActive('/tabs/tab1', true) && this.router.url === '/tabs/tab1')) {
        if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
          navigator['app'].exitApp();
        } else {
          this.presentToast('Presiona nuevamente para salir.', timePeriodToExit);
          lastTimeBackPress = new Date().getTime();
        }
      } else {
        this.zone.run(async () => {
          await this.router.navigateByUrl('/tabs/tab1');
        });
      }
    });
  }

  async presentToast(msg: string, delay) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: delay,
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
  };
}
