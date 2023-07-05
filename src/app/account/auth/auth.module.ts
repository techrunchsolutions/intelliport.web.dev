import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgOtpInputModule } from  'ng-otp-input';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverpwdComponent } from './recoverpwd/recoverpwd.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { ConfirmmailComponent } from './confirmmail/confirmmail.component';
import { EmailverificationComponent } from './emailverification/emailverification.component';
import { SteptwoverificationComponent } from './steptwoverification/steptwoverification.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RecoverpwdComponent,
    LockscreenComponent,
    ConfirmmailComponent,
    EmailverificationComponent,
    SteptwoverificationComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgOtpInputModule
  ]
})
export class AuthModule { }