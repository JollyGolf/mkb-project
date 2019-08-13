import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-new-password-recovery',
  templateUrl: './new-password-recovery.page.html',
  styleUrls: ['../../assets/css/forms.scss', './new-password-recovery.page.scss'],
})
export class NewPasswordRecoveryPage implements OnInit {

  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
  }

  back() {
  	this.location.back()
  }

  toggle(){
  	this.router.navigate(['handbook']);
  }

}
