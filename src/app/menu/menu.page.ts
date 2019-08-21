import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { RoutingDataService } from '../services/routing-data.service';
import { UserAuthService } from '../services/user-auth.service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit, OnDestroy {

  pages = [
    {
      title: 'Справочник',
      url: '/handbook'
    },
    // {
    //   title: 'Аккаунт',
    //   url: '/account'
    // }
    {
      title: 'Регистрация',
      url: '/start'
    }

  ];

  selectedPath = '';
  modalFlag: boolean = true;
  advertisementFlag: boolean = false;
  advertisment: any;

  constructor(
    private router: Router, 
    private routerDataProv: RoutingDataService,
    private auth: UserAuthService,
    private iab: InAppBrowser
  ) { 
  	this.router.events.subscribe((event: RouterEvent) => {
  	  this.selectedPath = event.url;
  	})
  } 

  ngOnInit() {
    //if(localStorage.getItem('userToken')){
      if(!localStorage.getItem('advFlag')) {
        this.auth.getAdv();
        if(this.advertisementFlag == false) {
          setTimeout(() => {
            this.advertisment = this.routerDataProv.getAdv();
            this.modalFlag = false;
            this.advertisementFlag = true;
            localStorage.setItem('advFlag', 'true')
          }, 1000);
        }
      }
    //}
    
  }

  openAdv(){ this.iab.create(`${this.routerDataProv.getAdv().link}`, '_blank') }

  closeModal() { this.modalFlag = true }

  //signOut(){ this.auth.logout() }
  signOut(){ 
    localStorage.removeItem('advFlag');
    this.router.navigate(['start']) 
  }

  ngOnDestroy() { console.log('OnDestroy Menu Page') }

}
