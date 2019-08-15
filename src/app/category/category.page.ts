import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; 
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  current_category: string;
  illnesses: any = 0;

  constructor(private router: Router, private location: Location, private db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe( ready => {
      if(ready) {
        this.db.loadIllnesses(localStorage.getItem('category'), Number(localStorage.getItem('node_count')))
          .then(data => {
            this.illnesses = data;
            console.log('{Load Illnesses}', data);
          });
      }
      else console.log('{Database = false}', ready);
    })
    this.current_category = localStorage.getItem('category');
  }

  openIllness(illness: any){
    localStorage.setItem('illness', illness.code)
  	this.router.navigate(['illness']);
  }

  ionChange(value: string) {
    value == '' 
      ? console.log('select * from * where categoryName =',localStorage.getItem('category')) 
      : console.log('select * from * where categoryName =',localStorage.getItem('category'),'and itemName =', value);
  }

  back(){
  	this.location.back();
  }

}
