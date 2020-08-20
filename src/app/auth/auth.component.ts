import { Component, OnInit } from '@angular/core';
import { Auth, Hub } from 'aws-amplify';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ProfileComponent } from '../profile/profile.component';
import { NotificationComponent } from '../notification/notification.component';
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  userName: string;
  userId: string;
  loggedIn: boolean;
  loaded: boolean;
  visible: boolean;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(public router: Router, 
              public _auth:AuthService,
              public modalRef: MDBModalRef,
              public modalService: MDBModalService) { }

  ngOnInit(): void {

    this._auth.isLoggedIn$.subscribe(user => {
        if(user){
          this.router.navigate(['/profile']);
        }
    });

    this._auth.isSignInButtonClicked$.subscribe(state => {
      this.visible = state;
      console.log(this.visible);
    });

    /* Auth.currentAuthenticatedUser({
      bypassCache: false
    }).then(async user => {
      this.userId = user.attributes.sub;
      this.userName = user.username;
      console.log(this.userName);
      
    })
    .catch(err => console.log("err assigning"));

    Hub.listen('auth', (data) => {
      console.log(data);
      switch (data.payload.event) {
          case 'signIn':
              this.router.navigate(['/profile']);
              break;
          case 'signOut':
            this.router.navigate(['/login']);
            break;  
      }
  }); */

  }

  signIn(){
    this._auth.setSignInButtonStatus();
    this._auth.signIn(this.loginForm.get('username').value, this.loginForm.get('password').value);
  }

  signUp(){
    this.router.navigate(['/register']);
  }

  googleSignIn(){
    Auth.federatedSignIn(
      {
        'provider': CognitoHostedUIIdentityProvider.Google
      }
    )
  }

}
