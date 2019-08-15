import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-handbook',
  templateUrl: './handbook.page.html',
  styleUrls: ['./handbook.page.scss'],
})
export class HandbookPage implements OnInit {

   //@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  searchText: string;
  categories: any = 0;

  constructor(private router: Router, private db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe( ready => {
      if(ready) {
        this.db.loadClasses(10)
          .then(data => {
            this.categories = data;
            //console.log(data);
          });
      }
    })
  }

  searchBy(value: string) { }

  ionChange(value: string) {
    //console.log(this.data);
    value == '' 
      ? console.log('select * from *') 
      : console.log('select * from * where categoryName =', value);
  }

  openCategory(category) {
  	console.log(category.code);
    localStorage.setItem('category', category.code);
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
