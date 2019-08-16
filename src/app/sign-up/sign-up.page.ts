import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; 
//import { DatabaseService } from '../services/database.service';
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
  }

  constructor(
    private router: Router, 
    private location: Location, 
    //private db: DatabaseService,
    private auth: UserAuthService
  ) { }

  ngOnInit() {
    // this.db.getDatabaseState().subscribe( ready => {
    //   console.log('database ready:', ready);
    // })
  }

  signUp() {
    this.auth.registration(this.data);
  }
  
  back(){
  	//this.router.navigate(['log-in']);
    this.location.back()
  }

}
