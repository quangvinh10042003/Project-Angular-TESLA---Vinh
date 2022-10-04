import { AccountService } from './../../../services/account.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  checkStr: any;
  account: any;
  numberCart: any;
  getCart:any;
  navMenu:string = 'Login';
  isUserLoggedIn: any;
  constructor(private accountService: AccountService, private router: Router) { }
  ngOnInit(): void {
    this.checkStr = sessionStorage.getItem('accountSignIn');
    this.checkStr = JSON.parse(this.checkStr);
    if(this.checkStr){
      this.accountService.getItem(this.checkStr.id).subscribe((data:any)=>{
        this.getCart = data.cart.length;
      })
    }
    this.accountService.isUserLoggedIn.subscribe((value:boolean) =>{
      this.isUserLoggedIn = value;
    })
    this.accountService.totalCard.subscribe((data:any)=>{
      this.getCart = data;
    })
    window.onscroll = () => {
      this.scrollFunction();
    };
    document.addEventListener('click', function handleClickOutsideBox(event: any) {
      let but = document.getElementById('but') as HTMLDivElement | null;
      let box = document.getElementById('modalMobile') as HTMLDivElement | null;
      if (!but?.contains(event.target)) {
        box?.classList.add('d-none');
        let cardNumber = document.getElementById('cartNum') as HTMLDivElement | null;
        cardNumber?.classList.remove('d-block');
        box?.classList.add('d-none');
      }
    });

  }
  openMenuMobile() {
    let menu = document.getElementById('modalMobile') as HTMLDivElement | null;
    let accountSignIn = sessionStorage.getItem('accountSignIn');
    if(accountSignIn){
      let cardNumber = document.getElementById('cartNum') as HTMLDivElement | null;
      cardNumber?.classList.add('d-block');
    }
    menu?.classList.remove("d-none");
  }
  closeMenuMobile() {
    let menu = document.getElementById('modalMobile') as HTMLDivElement | null;
    let cardNumber = document.getElementById('cartNum') as HTMLDivElement | null;
    cardNumber?.classList.remove('d-block');
    menu?.classList.add("d-none");
  }
  closeMenuMobileAndSignOut(){
    let menu = document.getElementById('modalMobile') as HTMLDivElement | null;
    let cardNumber = document.getElementById('cartNum') as HTMLDivElement | null;
    cardNumber?.classList.remove('d-block');
    menu?.classList.add("d-none");
    this.accountService.isUserLoggedIn.next(false);
    this.accountService.totalCard.next(-1);
    sessionStorage.clear();
    this.router.navigate(['signin']);
  }
  scrollFunction(): any {
    let myopenheader = document.getElementById('oheader') as HTMLDivElement | null;
    let myheader = document.getElementById('header') as HTMLDivElement | null;
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {

      myheader?.classList.add('bg-light');
    } else {
      myheader?.classList.remove('bg-light');
    }
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      myopenheader?.classList.remove('d-none');
    } else {
      myopenheader?.classList.add('d-none');
    }
  }
  scrollTopShop(){
    document.documentElement.scrollTop = 0;
    this.router.navigate(['allshop']);
  }
  navigatorToSignIn(){
    Swal.fire({
      title: 'Please login first',
      text: "We will redirect you to the login page. Please log in to an authorized account to continue",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Login'
    }).then((result) => {
      if (result.isConfirmed) {
        this.accountService.totalCard.next(0);
        this.accountService.isUserLoggedIn.next(false);
        this.router.navigate(['/signin']);
      }
      else{
        return
      }
    })
  }
}
