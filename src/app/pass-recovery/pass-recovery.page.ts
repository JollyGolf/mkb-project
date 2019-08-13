import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-pass-recovery',
  templateUrl: './pass-recovery.page.html',
  styleUrls: ['../../assets/css/forms.scss', './pass-recovery.page.scss'],
})
export class PassRecoveryPage implements OnInit {

  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
  }

  back() {
  	this.location.back()
  }

  toggle(){
  	this.router.navigate(['message-recovery']);
  }
}
