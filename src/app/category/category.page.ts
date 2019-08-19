import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; 
import { DatabaseService } from '../services/database.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

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
    this.current_category = localStorage.getItem('category');
    this.getCategroies();
  }

  getCategroies(){
    this.db.getDatabaseState().subscribe( ready => {
      if(ready) {
        this.db.loadIllnesses(localStorage.getItem('category'), this.limit, this.offset*this.limit).then(data => {
          this.illnesses = data;
        });
      }
    })
  }

  openIllness(illness: any){
    if(illness.node_count == 0) {
      localStorage.setItem('illness', illness.code);
      this.router.navigate(['illness']);
    }
    else {
      localStorage.setItem('current_category', illness.code);
      localStorage.setItem('current_node_count', illness.node_count);
  	  this.router.navigate(['current-category']);
    }
    
  }

  ionChange(value: string) {
    this.searchText = value;
    if(value == '') {
      this.searchflag = false;
      this.searchOffset = 0;
      this.getCategroies();
      this.current_category = localStorage.getItem('category');
    }
    else {
      this.searchflag = true;
      this.offset = 0;
      this.db.getDatabaseState().subscribe( ready => {
        if(ready) {
          this.db.searchByIllnesses(localStorage.getItem('category'),value,this.searchLimit, this.searchLimit*this.offset).then(data => {
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
            localStorage.getItem('category'),
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
            localStorage.getItem('category'), 
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
