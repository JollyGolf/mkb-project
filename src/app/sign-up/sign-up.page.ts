import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; 
import { DatabaseService } from '../services/database.service';

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

  constructor(private router: Router, private location: Location, private db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe( ready => {
      console.log('database ready:', ready);
    })
  }

  signUp() {
    this.db.signup(this.data);
    //console.log(this.data);
    //this.router.navigate(['confirm-sign-up']);
  }
  
  back(){
  	//this.router.navigate(['log-in']);
    this.location.back()
  }

}
