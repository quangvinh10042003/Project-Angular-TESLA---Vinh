import { Router } from '@angular/router';
import { AccountService } from './../../../services/account.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  account:any;
  accountSignIn:any;
  passwordHide:string = '';
  getCart:any;
  constructor(private accService: AccountService, private router: Router) { }
  ngOnInit(): void {
    document.documentElement.scrollTop = 0;
    let openMenuInAccountPages = document.getElementById('openMenuInAccountPages') as HTMLDivElement | null;
    openMenuInAccountPages?.classList.remove('d-none');
    this.passwordHide = '';
    this.accountSignIn= sessionStorage.getItem('accountSignIn');
    this.accountSignIn = JSON.parse(this.accountSignIn);
    if(this.accountSignIn){
      this.accService.getItem(this.accountSignIn.id).subscribe(data=>{
        this.account = data;
        for(let i = 0; i <= this.account.password.length; i++){
          this.passwordHide += '* ';
        }
      })
    }
  } 
  deleteAccount(){
    sessionStorage.removeItem('accountSignIn');
    sessionStorage.setItem('check','true');
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.accService.deleteItem(this.accountSignIn.id).subscribe(()=>{
          this.accService.isUserLoggedIn.next(false);
          this.accService.totalCard.next(0);
          this.router.navigate(['']);
        })
      }
    })
  }
  signout(){
    this.accService.isUserLoggedIn.next(false);
    this.accService.totalCard.next(0);
    sessionStorage.clear();
    this.router.navigate(['signin']);
  }
}
