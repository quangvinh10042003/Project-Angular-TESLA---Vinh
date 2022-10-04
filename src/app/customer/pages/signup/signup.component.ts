import { AccountService } from './../../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  check: boolean = false;
  checkEye: boolean = true;
  emailInp: any;
  formAccount = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    address: new FormControl(''),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z_.][a-zA-Z0-9]{0,10}@[a-z0-9]{4,10}\.[a-z]{2,5}$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    access: new FormControl(false),
    cart: new FormControl([]),
    gender: new FormControl(''),
    telephoneNumber: new FormControl(''),
    history: new FormControl([]),
  })
  constructor(private router: Router, private accountService: AccountService) { }
  ngOnInit(): void {
    document.documentElement.scrollTop = 0;
    document.addEventListener('click', function handleClickOutsideBox(event: any) {
      let but = document.getElementById('typePass') as HTMLDivElement | null;
      let box = document.getElementById('boxTypePass') as HTMLDivElement | null;
      if (!but?.contains(event.target)) {
        box?.classList.add('d-none');
      }
    });
  }

  checkSignup() {
    if (!this.check) {
      this.check = true
    } else {
      this.check = false;
    }
  }

  get form(): any {
    return this.formAccount.controls;
  }

  onSubmit() {
    let openMenuInAccountPages = document.getElementById('openMenuInAccountPages') as HTMLDivElement | null;
    openMenuInAccountPages?.classList.add('d-none');
    let MyEmail;
    this.accountService.getAll().subscribe((data: any) => {
      MyEmail = data.find((item: any) => {
        return this.emailInp === item.email;
      })
      if (MyEmail == null) {
        sessionStorage.setItem('account', JSON.stringify(this.formAccount.value));
        this.accountService.addItem(this.formAccount.value).subscribe(() => {
          this.router.navigate(['signin']);
        });
      } else {
        let emailDuplicate = document.getElementById('emailDuplicate') as HTMLDivElement | null;
        emailDuplicate?.classList.remove('d-none');
      }
    })

  }

  showTypePass() {
    let box = document.getElementById('boxTypePass') as HTMLDivElement | null;
    box?.classList.remove('d-none');
  }
  showEye() {
    let buttonEye = document.getElementById('showText') as HTMLDivElement | null;
    let inputPass = document.getElementById('password') as HTMLInputElement | null;
    if (inputPass?.value == '') {
      buttonEye?.classList.add('d-none');
    } else {
      buttonEye?.classList.remove('d-none');
    }
  }
  showPass() {
    let inputPass = document.getElementById('password') as HTMLInputElement | null;
    let eye = document.getElementById('eye') as HTMLDivElement | null;
    if (this.checkEye == true) {
      inputPass?.setAttribute('type', 'text');
      eye?.setAttribute('class', 'fa-solid fa-eye-slash');
      this.checkEye = false;
    } else {
      inputPass?.setAttribute('type', 'password');
      eye?.setAttribute('class', 'fa-solid fa-eye');
      this.checkEye = true;
    }
  }
  closeEmailError(){
    let emailDuplicate = document.getElementById('emailDuplicate') as HTMLDivElement | null;
        emailDuplicate?.classList.add('d-none');
  }
}
