import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'sign-up', loadChildren: './sign-up/sign-up.module#SignUpPageModule' },
  { path: 'log-in', loadChildren: './log-in/log-in.module#LogInPageModule' },
  { path: 'confirm-sign-up', loadChildren: './confirm-sign-up/confirm-sign-up.module#ConfirmSignUpPageModule' },
  { path: 'success-sign-up', loadChildren: './success-sign-up/success-sign-up.module#SuccessSignUpPageModule' },
  { path: 'pass-recovery', loadChildren: './pass-recovery/pass-recovery.module#PassRecoveryPageModule' },
  { path: 'message-recovery', loadChildren: './message-recovery/message-recovery.module#MessageRecoveryPageModule' },
  { path: 'new-password-recovery', loadChildren: './new-password-recovery/new-password-recovery.module#NewPasswordRecoveryPageModule' },
  { path: 'splashscreen', loadChildren: './splashscreen/splashscreen.module#SplashscreenPageModule' },
  { path: 'category', loadChildren: './category/category.module#CategoryPageModule' },
  { path: 'illness', loadChildren: './illness/illness.module#IllnessPageModule' },
  { path: 'current-category', loadChildren: './current-category/current-category.module#CurrentCategoryPageModule' },
  { path: 'last-category', loadChildren: './last-category/last-category.module#LastCategoryPageModule' },
  //{ path: 'illnesses', loadChildren: './illnesses/illnesses.module#IllnessesPageModule' },
  { path: '', loadChildren: './menu/menu.module#MenuPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
