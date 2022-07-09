import Swal from 'sweetalert2'
import { AccountService } from './../../../services/account.service';
import { ActivatedRoute } from '@angular/router';
import { VehicalService } from './../../../services/vehical.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  colorChose: string = '';
  dataVehical: any;
  sliderImg: any = [];
  account: any;
  constructor(private vehicalSer: VehicalService, private actRout: ActivatedRoute, private accountSer: AccountService) { }

  ngOnInit(): void {
    let id = this.actRout.snapshot.params['id'];
    this.vehicalSer.getItem(id).subscribe(data => {
      this.sliderImg = data.allImg;
      this.dataVehical = data;
    })
    this.account = sessionStorage.getItem("accountSignIn");
    this.account = JSON.parse(this.account);
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
  chosePaint(color: string) {
    console.log(this.dataVehical.paint.length);
    for (let i = 0; i < this.dataVehical.paint.length; i++) {
      let box = document.getElementById(`box${this.dataVehical.paint[i].color}`) as HTMLDivElement | null;
      box?.classList.remove('borderChose');
    }
    let box = document.getElementById(`box${color}`) as HTMLDivElement | null;
    box?.classList.add('borderChose');
    this.colorChose = color;
  }
  addToCart() {
    if (this.colorChose == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You should choose the color fist!',
      })
    } else {
      this.accountSer.getItem(this.account.id).subscribe((data: any) => {
        data.cart.push({ name: this.dataVehical.name, category_id: this.dataVehical.category_id, img: this.dataVehical.imgProduct, property: this.colorChose, price: this.dataVehical.price });
        this.accountSer.editItem(this.account.id, data).subscribe();
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
}
