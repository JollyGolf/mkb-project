import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common'; 
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-illness',
  templateUrl: './illness.page.html',
  styleUrls: ['./illness.page.scss'],
})
export class IllnessPage implements OnInit {

  illness: any = 0;

  constructor(private location: Location, private db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe( ready => {
      if(ready) {
        this.db.loadIllness(localStorage.getItem('illness'))
          .then(data => {
            this.illness = data[0];
            console.log('{Load Illness}', data);
          });
        
        this.db.loadChild()
          .then(data => {
            console.log('{Load Childs}', data);
          })
      }
      else console.log('{Database = false}', ready);
    })
  }

  back(){
  	this.location.back();
  }
}
