import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; 
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-pass-recovery',
  templateUrl: './pass-recovery.page.html',
  styleUrls: ['../../assets/css/forms.scss', './pass-recovery.page.scss'],
})
export class PassRecoveryPage implements OnInit {
  
  data: object = {
    phone: ''
  }

  constructor(
    private router: Router, 
    private location: Location,
    private auth: UserAuthService
  ) { }

  ngOnInit() {}

  back() { this.location.back(); }

  toggle(){ this.auth.sendCode(this.data); }
}
