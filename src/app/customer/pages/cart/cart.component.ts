import { CategoryService } from './../../../services/category.service';
import { AccountService } from './../../../services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart:any;
  acc:any;
  category:any = [];
  constructor(private accSer: AccountService, private categorySer: CategoryService) { }
  accountSignIn:any;
  ngOnInit(): void {
    this.accountSignIn = sessionStorage.getItem('accountSignIn');
    this.accountSignIn = JSON.parse(this.accountSignIn);
    this.accSer.getItem(this.accountSignIn.id).subscribe((data:any)=>{
      this.acc = data;
      this.cart = data.cart;
      for(let i=0;i<this.cart.length;i++){
        this.categorySer.getItem(this.cart[i].category_id).subscribe((item:any)=>{
          this.category.push(item.name);
        })
      }
      console.log(this.category);
    })
  }
}
