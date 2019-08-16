import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; 
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-confirm-sign-up',
  templateUrl: './confirm-sign-up.page.html',
  styleUrls: ['../../assets/css/forms.scss', './confirm-sign-up.page.scss'],
})
export class ConfirmSignUpPage implements OnInit {

  code: string = '';

  constructor(
    private router: Router, 
    private location: Location,
    private auth: UserAuthService
  ) { }

  ngOnInit() {
    
  }

  toggle(){
    this.auth.registrationConfirm(this.code );
  }

  back(){
    this.location.back()
  }
}
