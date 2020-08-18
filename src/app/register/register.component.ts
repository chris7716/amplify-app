import { Component, OnInit } from '@angular/core';
import { Auth, Hub } from 'aws-amplify';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  submitButtonClicked: boolean;
  visible: boolean;

  registrationForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    phone_number: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required])
  });

  constructor(private _auth: AuthService, private _router: Router) {  }

  ngOnInit(): void {
    this._auth.isSignUpButtonClicked$.subscribe(state => {
      this.visible = state;
      console.log(this.visible);
    });
  }

  signUp(){
    this.submitButtonClicked = true;
    if (this.registrationForm.invalid){
      return;
    }
    this._auth.setSignUpButtonStatus();
    this._auth.signUp(this.registrationForm.get('username').value, this.registrationForm.get('password').value, this.registrationForm.get('phone_number').value, this.registrationForm.get('email').value);
  }

  signIn(){
    this._router.navigate(['/login']);
  }

  get username() {return this.registrationForm.get('username');}

  get password() {return this.registrationForm.get('password');}

  get phone_number() {return this.registrationForm.get('phone_number');}

  get email() {return this.registrationForm.get('email');}

}
