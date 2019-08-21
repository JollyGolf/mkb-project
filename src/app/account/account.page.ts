import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { RoutingDataService } from '../services/routing-data.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  username: any;
  points: any;
  total: any;
  index: number = 1;

  constructor(
    private auth: UserAuthService,
    private routerDataProv: RoutingDataService,
    private loaderProv: LoaderService
  ) { }

  ngOnInit() {
    this.auth.getInfo(this.index);
    setTimeout(() => {
      this.loaderProv.dismiss();
      let user = this.routerDataProv.getUser();
      this.username = user.user_name;
      this.points = user.points;
      this.total = user.points[0].total;
    }, 1000);
  }
}
