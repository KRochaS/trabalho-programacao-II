import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginTokenPage } from './login-token';

@NgModule({
  declarations: [
    LoginTokenPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginTokenPage),
  ],
})
export class LoginTokenPageModule {}
