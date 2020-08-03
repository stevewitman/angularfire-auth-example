import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from 'src/app/components/sign-in/sign-in.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from 'src/app/components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from 'src/app/components/verify-email/verify-email.component';
import { SignUpComponent } from 'src/app/components/sign-up/sign-up.component';
import { AuthGuard } from '../guard/auth.guard';
import { HomeComponent } from 'src/app/components/home/home.component';
import { ChangePasswordComponent } from 'src/app/components/change-password/change-password.component';
import {
  AngularFireAuthGuard,
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['sign-in']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard']);

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'sign-in',
    component: SignInComponent,
    ...canActivate(redirectLoggedInToDashboard),
  },
  {
    path: 'register-user',
    component: SignUpComponent,
    ...canActivate(redirectLoggedInToDashboard),
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    ...canActivate(redirectUnauthorizedToLogin),
    // canActivate: [AuthGuard],
  },
];

/*
  For AngularFire Router Guards see ... https://github.com/angular/angularfire/blob/master/docs/auth/router-guards.md
*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
