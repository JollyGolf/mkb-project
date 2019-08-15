import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['../../assets/css/forms.scss', './log-in.page.scss'],
})
export class LogInPage implements OnInit {

  data: object = {
    phone: '',
    password: ''
  }

  constructor(private router: Router, private db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe( ready => {
      console.log('database ready:', ready);
    })
  }

  logIn() {
    console.log('log-in-page.ts', this.data);
    this.db.login(this.data);
  }

  signUp() {
    //this.db.signup(this.data);
  }

  toggle(page: string){
  	this.router.navigate([page]);
  }
}
