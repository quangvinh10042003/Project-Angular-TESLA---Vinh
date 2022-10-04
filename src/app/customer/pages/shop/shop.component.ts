import { AccountService } from './../../../services/account.service';
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
  getCart: number = 0;
  slideTopSeller: any = [];
  allProduct: any = [];
  categoryList: any;
  keyword: string = "";
  minPrice: any;
  maxPrice: any;
  accountSignIn: any;
  constructor(private vehicalService: VehicalService, private accessoryService: ProductAcessoryService, private categoryService: CategoryService, private router: Router, private actRout: ActivatedRoute) { }

  ngOnInit(): void {
    let openMenuInAccountPages = document.getElementById('openMenuInAccountPages') as HTMLDivElement | null;
    openMenuInAccountPages?.classList.add('d-none');
    this.accountSignIn = sessionStorage.getItem('accountSignIn');
    this.accountSignIn = JSON.parse(this.accountSignIn);
    
    document.addEventListener('click', function handleClickOutsideBox(event: any) {
      let boxDetailSearched = document.getElementById('boxDetailSearched') as HTMLDivElement | null;
      if (!boxDetailSearched?.contains(event.target)) {
        boxDetailSearched?.classList.add('d-none');

      }
    });

    // in ra best seller
    this.showBestSeller();
    // in ra category
    this.categoryService.getAll().subscribe(data => {
      this.categoryList = data;
    })
    this.showByCategory();
    // in ra các sản phẩm theo category

  }
  showBestSeller() {
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
  }
  showByCategory() {
    let id: any = this.actRout.snapshot.params['id'];
    this.actRout.paramMap.subscribe(data => {
      this.allProduct = [];
      id = data.get('id');
      if (id) {
        this.vehicalService.getAll().subscribe(data => {
          data.map(item => {
            if (id == item.category_id) {
              this.allProduct.push(item);
            } else { }

          })
        })
        this.accessoryService.getAll().subscribe(data => {
          data.map(item => {
            if (id == item.category_id) {
              this.allProduct.push(item);
            } else { }
          })
        })
      } else {
        this.vehicalService.getAll().subscribe(data => {
          data.map(item => {
            this.allProduct.push(item);
          })
        })
        this.accessoryService.getAll().subscribe(data => {
          data.map(item => {
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
    autoplay: false,
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
    nav: false,
  }
  searchByCategory(id: number) {
    this.scroll();
    this.router.navigate([`/shop/${id}`]);
  }
  scroll() {
    document.documentElement.scrollTo(0, 1200);
  }
  navigateToProduct(id: number, categoryID: number) {
    if (categoryID == 1) {
      this.router.navigate([`/detail/${id}`]);
    } else {
      this.router.navigate([`/detailAccessory/${id}`]);
    }
  }
  showSearchBox() {
    let box = document.getElementById('boxDetailSearched') as HTMLDivElement | null;
    box?.classList.remove('d-none');
    box?.classList.remove('searchBoxInPrice');
  }
  showSearchPriceBox() {
    let box = document.getElementById('boxDetailSearched') as HTMLDivElement | null;
    box?.classList.remove('d-none');
    box?.classList.add('searchBoxInPrice');
  }
}
