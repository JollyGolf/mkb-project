import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-confirm-sign-up',
  templateUrl: './confirm-sign-up.page.html',
  styleUrls: ['../../assets/css/forms.scss', './confirm-sign-up.page.scss'],
})
export class ConfirmSignUpPage implements OnInit {

  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
  }

  toggle(){
  	this.router.navigate(['success-sign-up']);
  }

  back(){
  	//this.router.navigate(['sign-up']);
    this.location.back()
  }
}
