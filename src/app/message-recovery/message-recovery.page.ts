import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; 
import { UserAuthService } from '../services/user-auth.service';
import { RoutingDataService } from '../services/routing-data.service';

@Component({
  selector: 'app-message-recovery',
  templateUrl: './message-recovery.page.html',
  styleUrls: ['../../assets/css/forms.scss', './message-recovery.page.scss'],
})
export class MessageRecoveryPage implements OnInit {

  code: string = '';
  resendFlag: string = "true";

  constructor(
    private router: Router, 
    private location: Location,
    private auth: UserAuthService,
    private routerDataProv: RoutingDataService
  ) { }

  ngOnInit() { this.setActive() }

  back() { this.location.back() }

  resendCode(){
    this.resendFlag = "true";
    this.auth.resendCode();
    this.setActive();
  }

  setActive() {
    setTimeout(() => {
      this.resendFlag = "false";
    }, 3000);
  }

  toggle(){ this.auth.checkCode(this.code) }
}
