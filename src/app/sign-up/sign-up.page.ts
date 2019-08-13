import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['../../assets/css/forms.scss', './sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(private router: Router, private location: Location, ) { }

  ngOnInit() {
  }

  toggle(){
  	this.router.navigate(['confirm-sign-up']);
  }
  
  back(){
  	//this.router.navigate(['log-in']);
    this.location.back()
  }

}
