import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
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
    private router: Router,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#112D36');
    this.platform.ready().then(() => {
    this.router.navigate(['handlbook']);
    //localStorage.getItem('userToken') ? this.router.navigate(['handlbook']) : this.router.navigate(['log-in']);
    this.statusBar.styleDefault();
    this.splashScreen.hide();
    });
  }
}
