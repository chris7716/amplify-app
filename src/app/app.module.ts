import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import { AuthComponent } from './auth/auth.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthService } from './service/auth.service';
import { from } from 'rxjs';
import { MDBBootstrapModule, MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotificationComponent } from './notification/notification.component';
import { RegisterComponent } from './register/register.component';

/* Configure Amplify resources */
Amplify.configure(awsconfig);

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ProfileComponent,
    NotificationComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyUIAngularModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthService, MDBModalRef, MDBModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
