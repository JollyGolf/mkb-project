import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; 
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-current-category',
  templateUrl: './current-category.page.html',
  styleUrls: ['../category/category.page.scss'],
})
export class CurrentCategoryPage implements OnInit {

  current_category: string;
  illnesses: any = 0;

  constructor(private router: Router, private location: Location, private db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe( ready => {
      if(ready) {
        this.db.loadIllnesses(localStorage.getItem('current_category'), Number(localStorage.getItem('current_node_count')))
          .then(data => {
            this.illnesses = data;
            console.log('{Load Current Category}', data);
          });
      }
      else console.log('{Database = false}', ready);
    })
    this.current_category = localStorage.getItem('current_category');
  }

  openIllness(illness: any){
    localStorage.setItem('last_category', illness.code);
    localStorage.setItem('last_node_count', illness.node_count);
  	this.router.navigate(['last-category']);
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
