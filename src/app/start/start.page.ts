import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['../../assets/css/forms.scss', './start.page.scss'],
})
export class StartPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  openHandlbookPage(){
    this.router.navigate(['handlbook']);
  }

}
