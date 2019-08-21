import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; 
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-new-password-recovery',
  templateUrl: './new-password-recovery.page.html',
  styleUrls: ['../../assets/css/forms.scss', './new-password-recovery.page.scss'],
})
export class NewPasswordRecoveryPage implements OnInit {

  data: any = {
    password: '',
    password_confirm: '',
  }

  constructor(
    private router: Router, 
    private location: Location,
    private auth: UserAuthService
  ) { }

  ngOnInit(){ }

  back(){ this.location.back() }

  toggle(){ this.auth.updatePassword(this.data.password, this.data.password_confirm) }

}
