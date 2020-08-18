import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { Auth, Hub } from 'aws-amplify';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';

export interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  id: string | null;
  email: string | null;
}

const initialAuthState = {
  isLoggedIn: false,
  username: null,
  id: null,
  email: null
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _authState = new BehaviorSubject<AuthState>(
    initialAuthState
  );

  private readonly _signInRequested = new BehaviorSubject<boolean>(false);

  private readonly _signUpRequested = new BehaviorSubject<boolean>(false);

  /** AuthState as an Observable */
  readonly auth$ = this._authState.asObservable();

  /** SignIn as an Observable */
  readonly signIn$ = this._signInRequested.asObservable();

  /** Signup as an Observable */
  readonly signUp$ = this._signUpRequested.asObservable();

  /** Observe the isLoggedIn slice of the auth state */
  readonly isLoggedIn$ = this.auth$.pipe(map(state => state.isLoggedIn));

  /** Observe the isSignInButtonClicked slice of the auth state */
  readonly isSignInButtonClicked$ = this.signIn$.pipe(map(state => state));

  /** Observe the isSignUpButtonClicked slice of the auth state */
  readonly isSignUpButtonClicked$ = this.signUp$.pipe(map(state => state));

  constructor(private _notification: NotificationService, private _router: Router) {
    // Get the user on creation of this service
    Auth.currentAuthenticatedUser().then(
      (user: any) => this.setUser(user),
      _err => this._authState.next(initialAuthState)
    );

    // Use Hub channel 'auth' to get notified on changes
    Hub.listen('auth', ({ payload: { event, data, message } }) => {
      if (event === 'signIn') {
        // On 'signIn' event, the data is a CognitoUser object
        this.setUser(data);
      } else {
        this._authState.next(initialAuthState);
      }
    });
  }

  async signUp(username: string, password: string, phone_number: string, email: string) {
    try {
        console.log(phone_number);
        const { user } = await Auth.signUp({
            username,
            password,
            attributes: {
                email,          // optional
                phone_number,   // optional - E.164 number convention
                // other custom attributes 
            }
        });
        console.log(user);
        this._signUpRequested.next(false);
        this._notification.showNotification("Please check your mailbox and activate your account.", "Confirm Sign-Up");
        this._router.navigate(['/login']);
    } catch (error) {
        console.log('error signing up:', error);
        this._signUpRequested.next(false);
        this._notification.showNotification(error.message, "Sign Up Failed");
    }
}

  async  signIn(username: string, password: string) {
    try {
        const user = await Auth.signIn(username, password);
        this.setUser(user);
        this._signInRequested.next(false);
    } catch (error) {
        this._notification.showNotification("Invalid credentioals", "Sign Up Failed");
        this._signInRequested.next(false);
    }
}

  setSignInButtonStatus(){
    this._signInRequested.next(true);
  }

  setSignUpButtonStatus(){
    this._signUpRequested.next(true);
  }

  private setUser(user: any) {
    if (!user) {
      return;
    }

    const {
      attributes: { sub: id, email },
      username
    } = user;

    this._authState.next({ isLoggedIn: true, id, username, email });
  }
  async  signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }
}
