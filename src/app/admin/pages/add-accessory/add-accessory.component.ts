import { CategoryService } from './../../../services/category.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductAcessoryService } from './../../../services/product-acessory.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-add-accessory',
  templateUrl: './add-accessory.component.html',
  styleUrls: ['./add-accessory.component.css']
})
export class AddAccessoryComponent implements OnInit {
  categoryList: any;
  quantitySlide: number = 1;
  allImg: any = [];

  formGroup = new FormGroup({
    name: new FormControl(''),
    category_id: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
    imgProduct: new FormControl(''),
    allImg: new FormControl(''),
    inHome: new FormControl(false),
    inTopSeller: new FormControl(false),
    inStock: new FormControl(true)
  })
  constructor(private accessorySer: ProductAcessoryService, private router: Router, private category: CategoryService) { }

  ngOnInit(): void {
    document.documentElement.scrollTop = 0;
    this.category.getAll().subscribe(data => {
      this.categoryList = data;
    })
  }
  enterSlider(){
    this.allImg = [];
    let setSlide = document.getElementById('setSlide') as HTMLDivElement | null;
    for (let i = 1; i <= this.quantitySlide; i++) {
      let id = i;
      let img: any = '';
      this.allImg.push({ id, img });
    }
    setSlide?.classList.remove('d-none');
  }
  setSlide() {
    this.form2.allImg.value = this.allImg;
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your slide has been saved',
      showConfirmButton: false,
      timer: 1000
    })
  }
  get form2(): any {
    return this.formGroup.controls;
  }
  changeImage(event:any,i:number){
    const reader = new FileReader();
    const file = event.target.files;
    reader.readAsDataURL(file[0]);
    reader.onload = ()=>{
      this.allImg[i].img = reader.result;
    }
  }
  changeImageProduct(event:any){
    const reader = new FileReader();
    const file = event.target.files;
    reader.readAsDataURL(file[0]);
    reader.onload = ()=>{
      this.form2.imgProduct.value = reader.result;
    }
  }
  submitProduct() {
    Swal.fire({
      title: 'Do you want to save the new vehical?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success');
        this.accessorySer.addItem(this.formGroup.value).subscribe(() => {
          this.router.navigate(['admin']);
        })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
}
