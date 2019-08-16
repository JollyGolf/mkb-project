import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { RoutingDataService } from '../services/routing-data.service';

const adds = [1, 2, 3, 4, 5];

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
  randomItem: number;

  constructor(private router: Router, private routerDataProv: RoutingDataService) { 
  	this.router.events.subscribe((event: RouterEvent) => {
  	  this.selectedPath = event.url;
  	})
  }

  ngOnInit() {
    if(this.advertisementFlag == false) {
      this.randomItem = adds[Math.floor(Math.random() * adds.length)];
      setTimeout(() => {
        this.modalFlag = false;
        this.advertisementFlag = true;
      }, 1000);
    }
  }

  closeModal() {
    this.modalFlag = true;
  }

  signOut(){
    localStorage.removeItem('userToken');
  	this.router.navigate(['log-in']);
  }

  ngOnDestroy() {
    console.log('{OnDestroy Menu Page}');
  }

}
