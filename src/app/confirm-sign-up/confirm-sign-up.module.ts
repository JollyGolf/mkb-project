import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConfirmSignUpPage } from './confirm-sign-up.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmSignUpPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConfirmSignUpPage]
})
export class ConfirmSignUpPageModule {}
