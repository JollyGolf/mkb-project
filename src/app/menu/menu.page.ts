import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

const adds = [1, 2, 3, 4, 5];

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

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
  randomItem: number;

  constructor(private router: Router) { 
  	this.router.events.subscribe((event: RouterEvent) => {
  	  this.selectedPath = event.url;
  	})
  }

  ngOnInit() {
    this.randomItem = adds[Math.floor(Math.random() * adds.length)];
    setTimeout(() => this.modalFlag = false, 1000);
  }

  closeModal() {
    this.modalFlag = true;
  }

  signOut(){
  	this.router.navigate(['log-in']);
  }

}
