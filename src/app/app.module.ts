import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResultsComponent } from './results/results.component';
import { DetailsComponent } from './details/details.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Device } from '@ionic-native/device/ngx';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser/ngx';
import { HttpClientModule } from '@angular/common/http';
import { CommerceService } from './services/commerce.service';

@NgModule({
  declarations: [AppComponent, ResultsComponent, DetailsComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    AndroidPermissions,
    CallNumber,
    Device,
    InAppBrowser,
    CommerceService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
