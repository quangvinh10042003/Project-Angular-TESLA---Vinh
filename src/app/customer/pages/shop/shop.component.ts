import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './../../../services/category.service';
import { VehicalService } from './../../../services/vehical.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductAcessoryService } from 'src/app/services/product-acessory.service';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  bannerList: any = [];
  slideTopSeller: any = [];
  allProduct: any = [];
  categoryList: any;
  keyword: string = '';
  constructor(private vehicalService: VehicalService, private accessoryService: ProductAcessoryService, private categoryService: CategoryService, private router: Router, private actRout: ActivatedRoute) { }

  ngOnInit(): void {
    // in ra banner 
    this.vehicalService.getAll().subscribe(data => {
      data.map(item => {
        if (item.inBanner) {
          this.bannerList.push(item);
        } else { }
      })
    });
    this.accessoryService.getAll().subscribe(data => {
      data.map(item => {
        if (item.inBanner) {
          this.bannerList.push(item);
        } else { }
      })
    });
    // in ra best seller
    this.vehicalService.getAll().subscribe(data => {
      data.map(item => {
        if (item.inTopSeller) {
          this.slideTopSeller.push(item);
        } else { }
      })
    });
    this.accessoryService.getAll().subscribe(data => {
      data.map(item => {
        if (item.inTopSeller) {
          this.slideTopSeller.push(item);
        } else { }
      })
    });
    // in ra category
    this.categoryService.getAll().subscribe(data => {
      this.categoryList = data;
    })

    // in ra các sản phẩm theo category
    let id: any = this.actRout.snapshot.params['id'];
    this.actRout.paramMap.subscribe(data => {
      this.allProduct = [];
      id = data.get('id');
      if (id) {
        this.vehicalService.getAll().subscribe(data => {
          data.map(item => {
            if(id == item.category_id){
              this.allProduct.push(item);
            }else{}
            
          })
        })
        this.accessoryService.getAll().subscribe(data => {
          data.map(item => {
            if(id == item.category_id){
              this.allProduct.push(item);
            }else{}
          })
        })
      } else {
        this.vehicalService.getAll().subscribe(data => {
          data.map(item =>{
            this.allProduct.push(item);
          })
        })
        this.accessoryService.getAll().subscribe(data => {
          data.map(item =>{
            this.allProduct.push(item);
          })
        })
      }
    })
  }
  OptionsSliderBanner: OwlOptions = {
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
  OptionsSliderTopSeller: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      940: {
        items: 3
      }
    },
    nav: true,
  }
  searchByCategory(id: number) {
    this.scroll();
    this.router.navigate([`/shop/${id}`]);
  }
  scroll(){
    document.documentElement.scrollTo(0,1200);
  }
  navigateToDetailAccessory(id:number){
    this.router.navigate([`/detailAccessory/${id}`]);
  }
  navigateToDetail(id:number){
    this.router.navigate([`/detail/${id}`]);
  }
}
