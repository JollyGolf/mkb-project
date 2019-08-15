import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
 
// export interface Dev {
//   id: number,
//   name: string,
//   skills: any[],
//   img: string
// }
 
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  apiURL = 'http://4.dev-kit.ru:3000/api/client/';
  classes = new BehaviorSubject([]);
  illnesses = new BehaviorSubject([]);
 
  constructor(
  	private plt: Platform, 
  	private sqlitePorter: SQLitePorter, 
  	private sqlite: SQLite, 
    private http: HttpClient
  ) {
    this.plt.ready().then(() => {
      	this.sqlite.create({
	        name: 'mkb.db',
	        location: 'default' 
	    })
	    .then((db: SQLiteObject) => {
	        this.database = db;
	        this.seedDatabase();
	    })
	    .catch(err => console.log('constructor', err));
    });
  }
 
  seedDatabase() {
    this.http.get('assets/true-mkb.sql', { responseType: 'text'})
    .subscribe(sqlite => {
      this.sqlitePorter.importSqlToDb(this.database, sqlite)
        .then(_ => {
          this.dbReady.next(true);
          console.log('{} Database Ready');
        })
        .catch(e => console.error('{seedDatabase}', e));
    });
  }
 
  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  loadClasses(limit: number) {
    return this.database.executeSql(`SELECT * FROM class_mkb WHERE parent_code IS NULL LIMIT ${limit}`, []).then(data => {
      let classes = [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          classes.push({ 
            id: data.rows.item(i).id,
            name: data.rows.item(i).name, 
            code: data.rows.item(i).code,
            parent_id: data.rows.item(i).parent_id,
            parent_code: data.rows.item(i).parent_code,
            node_count: data.rows.item(i).node_count,
            additional_info: data.rows.item(i).additional_info
          });
          /* console.log(
            '$i=', i, 
            ' id=>', data.rows.item(i).id,
            ' name=>', data.rows.item(i).name,
            ' info=>', data.rows.item(i).additional_info,
          ); */
        }

      }
      this.classes.next(classes);
      return classes;
    });
  }

  loadIllnesses(parent: string, limit: number) {
    return this.database.executeSql(`SELECT * FROM class_mkb WHERE parent_code = '${parent}' LIMIT ${limit}`, []).then(data => {
      let illnesses = [];
      //console.log('CUSTOM DATA:', data)
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          illnesses.push({ 
            id: data.rows.item(i).id,
            name: data.rows.item(i).name, 
            code: data.rows.item(i).code,
            parent_id: data.rows.item(i).parent_id,
            parent_code: data.rows.item(i).parent_code,
            node_count: data.rows.item(i).node_count,
            additional_info: data.rows.item(i).additional_info
          });
          console.log(
            '$i=', i, 
            ' id=>', data.rows.item(i).id,
            ' name=>', data.rows.item(i).name,
            ' info=>', data.rows.item(i).additional_info,
          );
        }
      }
      this.illnesses.next(illnesses)
      return illnesses;
    });
  }

  


  login(data){
    const head = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    console.log('HTTP CUSTOM POST: ', this.apiURL + "login", data, {headers: head});
    this.http.post(this.apiURL + "login", data, {headers: head}).subscribe(
      data => {
        console.log(data)
      },
      err => {
        console.log('{login}:', err);
      }
    );
  }

  signup(data) {
    const head = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    this.http.post(this.apiURL + "registration", data, {headers: head}).subscribe(
      data => {
        console.log('{Success}', data)
      },
      err => {
        console.log('{signup} ', err);
      }
    );
  }

  signup_confirm(data) {
    const head = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    this.http.post(this.apiURL + "registration_confirm", data, {headers: head}).subscribe(
      data => {
        console.log('{Success}', data)
      },
      err => {
        console.log('{signup_confirm}', err);
      }
    );
  }

  recovery_send_code(data) {
    const head = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    this.http.post(this.apiURL + "password_send_code", data, {headers: head}).subscribe(
      data => {
        console.log('{Success}', data)
      },
      err => {
        console.log('{revocery_send_code}', err);
      }
    );
  }

  recovery_check_code(data) {
    const head = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    this.http.post(this.apiURL + "password_check_code", data, {headers: head}).subscribe(
      data => {
        console.log('{Success}', data)
      },
      err => {
        console.log('{recovery_check_code}', err);
      }
    );
  }

  set_password(data) {
    const head = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    this.http.put(this.apiURL + "password", data, {headers: head}).subscribe(
      data => {
        console.log('{Success}', data)
      },
      err => {
        console.log('{set_password}', err);
      }
    );
  }

  logout(data) {
    const head = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    this.http.put(this.apiURL + "logout", data, {headers: head}).subscribe(
      data => {
        console.log('{Success}', data)
      },
      err => {
        console.log('{logout}', err);
      }
    );
  }

  // addDeveloper(name, skills, img) {
  //   let data = [name, JSON.stringify(skills), img];
  //   return this.database.executeSql('INSERT INTO developer (name, skills, img) VALUES (?, ?, ?)', data).then(data => {
  //     this.loadDevelopers();
  //   });
  // }
 
  // getDeveloper(id): Promise<Dev> {
  //   return this.database.executeSql('SELECT * FROM developer WHERE id = ?', [id]).then(data => {
  //     let skills = [];
  //     if (data.rows.item(0).skills != '') {
  //       skills = JSON.parse(data.rows.item(0).skills);
  //     }
  //     return {
  //       id: data.rows.item(0).id,
  //       name: data.rows.item(0).name, 
  //       skills: skills, 
  //       img: data.rows.item(0).img
  //     }
  //   });
  // }
 
  // deleteDeveloper(id) {
  //   return this.database.executeSql('DELETE FROM developer WHERE id = ?', [id]).then(_ => {
  //     this.loadDevelopers();
  //     this.loadProducts();
  //   });
  // }
 
  // updateDeveloper(dev: Dev) {
  //   let data = [dev.name, JSON.stringify(dev.skills), dev.img];
  //   return this.database.executeSql(`UPDATE developer SET name = ?, skills = ?, img = ? WHERE id = ${dev.id}`, data).then(data => {
  //     this.loadDevelopers();
  //   })
  // }
 
  // loadProducts() {
  //   let query = 'SELECT product.name, product.id, developer.name AS creator FROM product JOIN developer ON developer.id = product.creatorId';
  //   return this.database.executeSql(query, []).then(data => {
  //     let products = [];
  //     if (data.rows.length > 0) {
  //       for (var i = 0; i < data.rows.length; i++) {
  //         products.push({ 
  //           name: data.rows.item(i).name,
  //           id: data.rows.item(i).id,
  //           creator: data.rows.item(i).creator,
  //          });
  //       }
  //     }
  //     this.products.next(products);
  //   });
  // }
 
  // addProduct(name, creator) {
  //   let data = [name, creator];
  //   return this.database.executeSql('INSERT INTO product (name, creatorId) VALUES (?, ?)', data).then(data => {
  //     this.loadProducts();
  //   });
  // }

}