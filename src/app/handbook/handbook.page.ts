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

  @ViewChild(IonInfiniteScroll, null) infiniteScroll: IonInfiniteScroll;

  
  categories: any = 0;
  limit: number = 10;
  offset: number = 0;

  searchOffset: number = 0;
  searchflag: boolean = false;
  searchLimit: number = 10;
  searchResult: any = 0;
  searchText: string;

  constructor(private router: Router, private db: DatabaseService) { }

  ngOnInit() {
    this.getCategrories();
  }

  getCategrories() {
    this.db.getDatabaseState().subscribe( ready => {
      if(ready) {
        this.db.loadClasses(this.limit, this.offset*this.limit).then(data => {
          this.categories = data;
        });
      }
    })
  }

  ionChange(value: string) {
    this.searchText = value;
    if(value == '') {
      this.searchflag = false;
      this.searchOffset = 0;
      this.getCategrories();
    }
    else {
      this.searchflag = true;
      this.offset = 0;
      this.db.getDatabaseState().subscribe( ready => {
        if(ready) {
          this.db.searchBy(value,this.searchLimit, this.searchLimit*this.offset).then(data => {
            this.categories = data;
          });
        }
      })
    }
  }

  openCategory(category) {
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

  loadData(event) {
    if(this.searchflag){
      this.searchOffset++;
      this.offset = 0;
      this.db.getDatabaseState().subscribe( ready => {
        if(ready) {
          this.db.searchBy(this.searchText, this.searchLimit, this.searchLimit*this.searchOffset).then((data: any) => {
            this.categories = this.categories.concat(data);
            (data.length == 10) ? event.target.complete() : event.target.complete();
          });
        }
      })
    } 
    else {
      this.offset++;
      this.searchOffset = 0;
      this.db.getDatabaseState().subscribe( ready => {
        if(ready) {
          this.db.loadClasses(this.limit, this.limit*this.offset).then((data: any) => {
            this.categories = this.categories.concat(data);
            (data.length == 10) ? event.target.complete() : event.target.complete();
          });
        }
      })
    }
  }
}
