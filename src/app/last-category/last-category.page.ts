import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; 
import { DatabaseService } from '../services/database.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-last-category',
  templateUrl: './last-category.page.html',
  styleUrls: ['../category/category.page.scss'],
})
export class LastCategoryPage implements OnInit {

  @ViewChild(IonInfiniteScroll, null) infiniteScroll: IonInfiniteScroll;

  current_category: string;

  illnesses: any = 0;
  limit: number = 10;
  offset: number = 0;

  searchOffset: number = 0;
  searchflag: boolean = false;
  searchLimit: number = 10;
  searchResult: any = 0;
  searchText: string;

  constructor(
    private router: Router, 
    private location: Location, 
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.current_category = localStorage.getItem('last_category');
    this.getCategroies();
  }

  getCategroies(){
    this.db.getDatabaseState().subscribe( ready => {
      if(ready) {
        this.db.loadIllnesses(localStorage.getItem('last_category'), this.limit, this.offset*this.limit).then(data => {
          this.illnesses = data;
        });
      }
    })
  }

  openIllness(illness: any){
    localStorage.setItem('illness', illness.code);
  	this.router.navigate(['illness']);
  }  

  ionChange(value: string) {
    this.searchText = value;
    if(value == '') {
      this.searchflag = false;
      this.searchOffset = 0;
      this.getCategroies();
      this.current_category = localStorage.getItem('last_category');
    }
    else {
      this.searchflag = true;
      this.offset = 0;
      this.db.getDatabaseState().subscribe( ready => {
        if(ready) {
          this.db.searchByIllnesses(localStorage.getItem('last_category'),value,this.searchLimit, this.searchLimit*this.offset).then(data => {
            this.illnesses = data;
          });
        }
      })
    }
  }

  back(){
  	this.location.back();
  }

  loadData(event) {
    if(this.searchflag){
      this.searchOffset++;
      this.offset = 0;
      this.db.getDatabaseState().subscribe( ready => {
        if(ready) {
          this.db.searchByIllnesses(
            localStorage.getItem('current_category'),
            this.searchText,
            this.searchLimit, 
            this.searchLimit*this.offset
          ).then(data => {
            this.illnesses = this.illnesses.concat(data);
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
          this.db.loadIllnesses(
            localStorage.getItem('current_category'), 
            this.limit, 
            this.offset*this.limit
          ).then(data => {
            this.illnesses = this.illnesses.concat(data);
            (data.length == 10) ? event.target.complete() : event.target.complete();
          });
        }
      })
    }
  }
}
