import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      { 
        path: 'handbook', 
        loadChildren: '../handbook/handbook.module#HandbookPageModule' 
      },
      { 
        path: 'account', 
        loadChildren: '../account/account.module#AccountPageModule' 
      },
      {
        path: 'category',
        loadChildren: '../category/category.module#CategoryPageModule'
      },
      {
        path: 'current-category',
        loadChildren: '../current-category/current-category.module#CurrentCategoryPageModule'
      },
      {
        path: 'last-category',
        loadChildren: '../last-category/last-category.module#LastCategoryPageModule'
      },
      {
        path: 'illness',
        loadChildren: '../illness/illness.module#IllnessPageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/handbook'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
