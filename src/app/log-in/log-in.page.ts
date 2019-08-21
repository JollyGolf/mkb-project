import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['../../assets/css/forms.scss', './log-in.page.scss'],
})
export class LogInPage implements OnInit {

  data: any = {
    phone: '',
    password: ''
  }

  constructor(
    private router: Router, 
    private auth: UserAuthService
  ) { }

  ngOnInit() { }

  logIn() { this.auth.login(this.data) }

  toggle(page: string){
    this.data.phone = '';
    this.data.password = '';
  	this.router.navigate([page]);
  }
}
