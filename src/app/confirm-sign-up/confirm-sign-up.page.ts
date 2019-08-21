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
  resendFlag: string = "true";

  constructor(
    private router: Router, 
    private location: Location,
    private auth: UserAuthService
  ) { }

  ngOnInit() { this.setActive() }

  toggle(){ this.auth.registrationConfirm(this.code) }

  resendCode(){
    this.resendFlag = "true";
    this.auth.registrationResendCode();
    console.log('Resend');
    this.setActive();
  }

  setActive() {
    setTimeout(() => {
      this.resendFlag = "false";
    }, 3000);
  }

  back(){ this.location.back() }
}
