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
  searchResult: any = 0;

  constructor(private router: Router, private db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe( ready => {
      if(ready) {
        this.db.loadClasses(10)
          .then(data => {
            this.categories = data;
            console.log('{Load categories}',data);
          });
      }
    })
  }

  searchBy(value: string) { }

  ionChange(value: string) {
    //console.log(this.data);
    if(value == '') {
      this.db.getDatabaseState().subscribe( ready => {
        if(ready) {
          this.db.loadClasses(10).then(data => {
            this.categories = data;
            console.log('{Load categories}',data);
          });
        }
      })
    }
    else {
      this.db.getDatabaseState().subscribe( ready => {
        if(ready) {
          this.db.searchBy(value,10).then(data => {
            this.categories = data;
            console.log('{Search by', value,'of', data);
          });
        }
      })
    }
  }

  openCategory(category) {
    console.log('{Category code}',category.code);
    if(category.node_count == 0) {
      localStorage.setItem('illness', category.code);
      this.router.navigate(['illness']);
    }
    else {
      localStorage.setItem('category', category.code);
      localStorage.setItem('node_count', category.node_count)
  	  this.router.navigate(['category']);
    }
    
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
