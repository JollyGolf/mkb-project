import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-sign-up',
  templateUrl: './success-sign-up.page.html',
  styleUrls: ['../../assets/css/forms.scss', './success-sign-up.page.scss'],
})
export class SuccessSignUpPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toggle(){
  	this.router.navigate(['handbook']);
  }

}
