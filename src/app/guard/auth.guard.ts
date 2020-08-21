import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise((resolve) => {
        Auth.currentAuthenticatedUser({
            bypassCache: false
          })
          .then((user) => {
            console.log(user);
            if(user){
              resolve(true);
            }
          })
          .catch(() => {
            //this.router.navigate(['/login']);
            resolve(false);
          });
      });
    }
  
}
