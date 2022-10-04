
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductAcessoryService } from './../../../services/product-acessory.service';
import { CategoryService } from './../../../services/category.service';
import { AccountService } from './../../../services/account.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  dateBuy: any;
  getCart: number = 0;
  cart: any;
  acc: any;
  subtotal: number = 0;
  category: any = [];
  listPrice: any = [];
  billingCheckbox: boolean = false;
  history: any = [];
  constructor(private accSer: AccountService, private categorySer: CategoryService, private accessorySer: ProductAcessoryService) { }
  accountSignIn: any;
  formGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    address: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z_.][a-zA-Z0-9]{0,10}@[a-z0-9]{4,10}\.[a-z]{2,5}$')
    ]),
    password: new FormControl('', [
    ]),
    access: new FormControl(false),
    gender: new FormControl(''),
    telephoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0][1-9]{9}$'),
    ]),
    cart: new FormControl([]),
    history: new FormControl([]),
  })
  ngOnInit(): void {
    document.documentElement.scrollTop = 0;
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1; // getMonth() returns month from 0 to 11
    let year = date.getFullYear();
    this.accSer.totalCard.subscribe((data: any) => {
      this.getCart = data;
    })
    this.dateBuy = `${day}/${month}/${year}`;
    let openMenuInAccountPages = document.getElementById('openMenuInAccountPages') as HTMLDivElement | null;
    openMenuInAccountPages?.classList.add('d-none');
    this.accountSignIn = sessionStorage.getItem('accountSignIn');
    this.accountSignIn = JSON.parse(this.accountSignIn);
    this.getAllData();
  }
  get form(): any {
    return this.formGroup.controls;
  }
  getAllData() {
    this.subtotal = 0;
    this.listPrice = [];
    this.accSer.getItem(this.accountSignIn.id).subscribe((data: any) => {
      this.formGroup.patchValue(data);
      this.acc = data;
      this.cart = data.cart;
      this.history = data.history;
      this.getCart = data.cart.length;
      for (let i = 0; i < this.cart.length; i++) {
        this.categorySer.getItem(this.cart[i].category_id).subscribe((item: any) => {
          this.category.push(item.name);
        })
        if (this.cart[i].quantity == null) {
          this.subtotal += parseInt(this.cart[i].price);
          this.listPrice.push(parseInt(this.cart[i].price));
        } else {
          this.subtotal += parseInt(this.cart[i].price) * this.cart[i].quantity;
          this.listPrice.push(parseInt(this.cart[i].price) * this.cart[i].quantity);
        }
      }
    })
  }
  removeItem(i: number) {
    this.subtotal = 0;
    this.cart.splice(i, 1);
    this.listPrice.splice(i, 1);
    this.getCart -= 1;
    this.accSer.totalCard.next(this.getCart);
    this.accSer.getItem(this.accountSignIn.id).subscribe((data: any) => {
      data.cart = this.cart;
      this.accSer.editItem(this.accountSignIn.id, data).subscribe();
      for (let i = 0; i < this.cart.length; i++) {
        this.categorySer.getItem(this.cart[i].category_id).subscribe((item: any) => {
          this.category.push(item.name);
        })
        if (this.cart[i].quantity == null) {
          this.subtotal += this.cart[i].price;
        } else {
          this.subtotal += this.cart[i].price * this.cart[i].quantity;
        }
      }
    })
  }
  reduceQuantity(i: number) {
    this.accSer.getItem(this.accountSignIn.id).subscribe((data: any) => {
      data.cart[i].quantity = data.cart[i].quantity - 1;
      if (data.cart[i].quantity == 0) {
        this.removeItem(i);
      } else {
        this.accSer.editItem(this.accountSignIn.id, data).subscribe(() => {
          this.getAllData();
        });
      }
    })
  }
  increaseQuantity(i: number) {
    this.accSer.getItem(this.accountSignIn.id).subscribe((data: any) => {
      data.cart[i].quantity = data.cart[i].quantity + 1;
      this.accSer.editItem(this.accountSignIn.id, data).subscribe(() => {
        this.getAllData();
      });
    })
  }
  checkBilling() {
    if (this.billingCheckbox) {
      this.billingCheckbox = false;
    } else {
      this.billingCheckbox = true;
    }
  }
  buyCart() {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Successful purchase',
      text: 'Thank you for shopping at TESLA',
      showConfirmButton: false,
      timer: 2000
    })
    this.history.push({
      consignee: this.form.name.value,
      subtotal: this.subtotal,
      email: this.form.email.value,
      address: this.form.address.value,
      telephoneNumber: this.form.telephoneNumber.value,
      date: this.dateBuy,
      cart: this.cart
    })
    this.acc.cart = [];
    this.acc.history = this.history;
    this.accSer.editItem(this.accountSignIn.id, this.acc).subscribe(() => {
      this.accSer.totalCard.next(0);
    });
  }
}
