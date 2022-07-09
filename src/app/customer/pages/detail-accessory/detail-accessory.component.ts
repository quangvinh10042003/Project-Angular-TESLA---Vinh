import { AccountService } from './../../../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductAcessoryService } from 'src/app/services/product-acessory.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import Swal from 'sweetalert2'
import { ProductAccessory } from 'src/app/models/product-accessory';
@Component({
  selector: 'app-detail-accessory',
  templateUrl: './detail-accessory.component.html',
  styleUrls: ['./detail-accessory.component.css']
})
export class DetailAccessoryComponent implements OnInit {
  data: any;
  accountSignIn: any;
  sliderImg: any = [];
  quantityValue: number = 1;
  recommendProduct: any;
  constructor(private accountSer: AccountService, private accessorySer: ProductAcessoryService, private actRout: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let id = this.actRout.snapshot.params['id'];
    this.accessorySer.getItem(id).subscribe(data => {
      this.sliderImg = data.allImg;
      this.data = data;
      this.accessorySer.getAll().subscribe(data => {
        this.recommendProduct = data.filter(item => {
          return item.category_id == this.data.category_id
        })
      })
    })
    this.accountSignIn = sessionStorage.getItem('accountSignIn');
    this.accountSignIn = JSON.parse(this.accountSignIn);
  }
  OptionsSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 1000,
    autoplayTimeout: 3000,
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
  }
  OptionsRecommend: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    // autoplay: true,
    autoplaySpeed: 1000,
    autoplayTimeout: 3000,
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
  }
  reduceQuantity() {
    let input: any = document.getElementById('quantityInp') as HTMLInputElement;
    this.quantityValue = this.quantityValue - 1;
    if (input.value <= 1 || input.value == '') {
      this.quantityValue = 1
    }
  }
  increaseQuantity() {
    let input: any = document.getElementById('quantityInp') as HTMLInputElement;
    this.quantityValue = this.quantityValue + 1;
    if (input.value <= 0 || input.value == '') {
      this.quantityValue = 1
    }
  }
  navigateToDetailAccessory(id: number) {
    this.router.navigate([`/detailAccessory/${id}`]);
    this.accessorySer.getItem(id).subscribe(data => {
      this.sliderImg = data.allImg;
      this.data = data;
      this.accessorySer.getAll().subscribe(data => {
        this.recommendProduct = data.filter(item => {
          return item.category_id == this.data.category_id
        })
      })
    })
    this.accountSignIn = sessionStorage.getItem('accountSignIn');
  }
  addToCart() {
    this.accountSer.getItem(this.accountSignIn.id).subscribe((data: any) => {
      data.cart.push({ name: this.data.name, quantity: this.quantityValue, price: this.data.price });
      this.accountSer.editItem(this.accountSignIn.id, data).subscribe();
    })
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'The product has been added to your cart',
      showConfirmButton: false,
      timer: 1000
    })
  }
}
