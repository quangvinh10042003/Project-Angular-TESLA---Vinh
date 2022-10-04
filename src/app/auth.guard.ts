import { Account } from './models/account';
import { AccountService } from './services/account.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private accountService: AccountService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let account: any = sessionStorage.getItem('accountSignIn');
    account = JSON.parse(account);
    if (account) {
      if (account.access) {
        return true;
      }
      else {

        Swal.fire({
          title: 'You do not have access!',
          text: "We will redirect you to the login page. Please log in to an authorized account to continue",
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Login'
        }).then((result) => {
          if (result.isConfirmed) { 
            this.router.navigate(['/signin']);
          }
        })
        return false;
      }
    }
    else {
      Swal.fire({
        title: 'You do not have access!',
        text: "We will redirect you to the login page. Please log in to an authorized account to continue",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/signin']);
        }
        else{
          this.router.navigate(['/']);
        }
      })
      return false;
    }
  }

}
