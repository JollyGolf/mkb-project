import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-handbook',
  templateUrl: './handbook.page.html',
  styleUrls: ['./handbook.page.scss'],
})
export class HandbookPage implements OnInit {

   //@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  searchText: string;

  constructor(private router: Router, private db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe( ready => {
      console.log('database ready:', ready);
    })
  }

  searchBy(value: string) { }

  ionChange(value: string) {
    value == '' 
      ? console.log('select * from *') 
      : console.log('select * from * where categoryName =', value);
  }

  openCategory(category: string) {
  	console.log(category);
    localStorage.setItem('category', category);
  	this.router.navigate(['category']);
  }  



  // loadData(event) {
  //   setTimeout(() => {
  //     console.log('Infinite scroll - Done');
  //     event.target.complete();

  //     // App logic to determine if all data is loaded
  //     // and disable the infinite scroll
  //     //if (data.length == 1000) {
  //     if(true) {
  //       event.target.disabled = true;
  //     }
  //   }, 1000);
  // }



}
