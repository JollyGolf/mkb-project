import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-message-recovery',
  templateUrl: './message-recovery.page.html',
  styleUrls: ['../../assets/css/forms.scss', './message-recovery.page.scss'],
})
export class MessageRecoveryPage implements OnInit {

  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
  }

  back() {
  	this.location.back()
  }

  toggle(){
  	this.router.navigate(['new-password-recovery']);
  }
}
