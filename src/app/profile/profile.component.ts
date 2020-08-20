import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userName: string;
  userId: string;

  constructor(private _auth:AuthService, private _router:Router) { }

  ngOnInit(): void {
    Auth.currentAuthenticatedUser()
      .then(userData => {
        console.log(userData);
      })
      .catch(() => console.log('Not signed in'));
  }

  logOut(){
    this._auth.signOut();
    //this._router.navigate(['/login']);
  }

}
