import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; 
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['../../assets/css/forms.scss', './sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  data: object = {
    phone: '',
    password: '',
    password_confirm: '',
    name: ''
  };

  constructor(
    private location: Location, 
    private auth: UserAuthService
  ) { }

  ngOnInit() { }

  signUp() { this.auth.registration(this.data) }

  
  
  back(){ this.location.back() }

}
