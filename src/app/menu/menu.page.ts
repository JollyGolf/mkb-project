import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { RoutingDataService } from '../services/routing-data.service';
import { UserAuthService } from '../services/user-auth.service';

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
    {
      title: 'Аккаунт',
      url: '/account'
    }

  ];

  selectedPath = '';
  modalFlag: boolean = true;
  advertisementFlag: boolean = false;
  advertisment: any;

  constructor(
    private router: Router, 
    private routerDataProv: RoutingDataService,
    private auth: UserAuthService
  ) { 
  	this.router.events.subscribe((event: RouterEvent) => {
  	  this.selectedPath = event.url;
  	})
  }

  ngOnInit() {
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
  }

  closeModal() {
    this.modalFlag = true;
  }

  signOut(){
    localStorage.removeItem('advFlag');
    //localStorage.removeItem('userToken');
  	//this.router.navigate(['log-in']);
  }

  ngOnDestroy() {
    console.log('{OnDestroy Menu Page}');
  }

}
