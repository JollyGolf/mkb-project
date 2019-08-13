import { Component, OnInit } from '@angular/core';
import { togglePage } from '../shared/togglePage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['../../assets/css/forms.scss', './log-in.page.scss'],
})
export class LogInPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toggle(page: string){
  	this.router.navigate([page]);
  }
}
