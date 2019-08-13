import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewPasswordRecoveryPage } from './new-password-recovery.page';

const routes: Routes = [
  {
    path: '',
    component: NewPasswordRecoveryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewPasswordRecoveryPage]
})
export class NewPasswordRecoveryPageModule {}
