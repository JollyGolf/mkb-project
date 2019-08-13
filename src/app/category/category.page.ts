import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  current_category: string;

  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
    this.current_category = localStorage.getItem('category');
  }

  openIllness(){
  	console.log('Click');
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
