import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; 
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-last-category',
  templateUrl: './last-category.page.html',
  styleUrls: ['../category/category.page.scss'],
})
export class LastCategoryPage implements OnInit {

  current_category: string;
  illnesses: any = 0;

  constructor(private router: Router, private location: Location, private db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe( ready => {
      if(ready) {
        this.db.loadIllnesses(localStorage.getItem('last_category'), Number(localStorage.getItem('last_node_count')))
          .then(data => {
            this.illnesses = data;
            console.log('{Load Last Category}', data);
          });
      }
      else console.log('{Database = false}', ready);
    })
    this.current_category = localStorage.getItem('last_category');
  }

  openIllness(illness: any){
    //localStorage.setItem('illnesses', illness.code);
    //localStorage.setItem('illnesses_node_cound', illness.node_count);
    
    localStorage.setItem('illness', illness.code);
  	this.router.navigate(['illness']);
  }

  ionChange(value: string) {
    if(value == '') {
      this.db.getDatabaseState().subscribe( ready => {
        if(ready) {
          this.db.loadIllnesses(localStorage.getItem('last_category'), Number(localStorage.getItem('last_node_count')))
            .then(data => {
              this.illnesses = data;
              //console.log('{Load Illnesses}', data);
            });
        }
        else console.log('{Database = false}', ready);
      })
      this.current_category = localStorage.getItem('last_category');
    }
    else {
      this.db.getDatabaseState().subscribe( ready => {
        if(ready) {
          this.db.searchByIllnesses(localStorage.getItem('last_category'),value,10).then(data => {
            this.illnesses = data;
            console.log('{Search by', value,'of', data);
          });
        }
      })
    }
  }

  back(){
  	this.location.back();
  }


}
