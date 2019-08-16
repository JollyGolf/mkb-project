import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { RoutingDataService } from '../services/routing-data.service';

@Component({
  selector: 'app-success-sign-up',
  templateUrl: './success-sign-up.page.html',
  styleUrls: ['../../assets/css/forms.scss', './success-sign-up.page.scss'],
})
export class SuccessSignUpPage implements OnInit {

  data: Object= {
    phone: '',
    password: ''
  }

  constructor(
    private router: Router,
    private auth: UserAuthService,
    private routerDataProv: RoutingDataService
  ) { }

  ngOnInit() {
    this.data = {
      phone: this.routerDataProv.getData().phone,
      password: this.routerDataProv.getData().password
    }
  }

  toggle(){
    console.log('{ log-in }', this.data);
    this.auth.login(this.data);
  }

}
