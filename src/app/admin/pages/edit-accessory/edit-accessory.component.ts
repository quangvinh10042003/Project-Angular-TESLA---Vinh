import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductAcessoryService } from './../../../services/product-acessory.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-edit-accessory',
  templateUrl: './edit-accessory.component.html',
  styleUrls: ['./edit-accessory.component.css']
})
export class EditAccessoryComponent implements OnInit {
  id:any;
  quantitySlide:number = 1;
  allImg:any = [];
  categoryList:any;

  formGroup = new FormGroup({
    name: new FormControl(''),
    category_id: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
    imgProduct: new FormControl(''),
    allImg: new FormControl(''),
    inHome: new FormControl(false),
    inBanner: new FormControl(false),
    inTopSeller: new FormControl(false),
    inStock: new FormControl(true),
  })
  constructor(private accessorySer: ProductAcessoryService, private router: Router, private actRoute: ActivatedRoute, private category: CategoryService) { }

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params['id'];
    this.accessorySer.getItem(this.id).subscribe(data => {
      if (data) {
        this.formGroup.patchValue(data);
        this.quantitySlide = this.form.allImg.value.length;
        this.showSlider();
      }
    });
    this.category.getAll().subscribe(data=>{
      this.categoryList = data;
    })
  }
  
  get form():any{
    return this.formGroup.controls;
  }
  showSlider(){
    this.allImg = this.form.allImg.value;
    let setSlide = document.getElementById('setSlide') as HTMLDivElement | null;
    setSlide?.classList.remove('d-none');
  }
  enterSlider(){
    this.allImg = [];
    let setSlide = document.getElementById('setSlide') as HTMLDivElement | null;
    for(let i=1; i<=this.quantitySlide; i++){
      let id = i;
      let img:any ='';
      this.allImg.push({id,img});
    }
    setSlide?.classList.remove('d-none');
  }
  setSlide(){
    this.form.allImg.value = this.allImg;   
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your slide has been saved',
      showConfirmButton: false,
      timer: 1000
    })
  }
  submitProduct(){
    Swal.fire({
      title: 'Do you want to save these edits?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success');
        this.accessorySer.editItem(this.id,this.formGroup.value).subscribe(()=>{   
          this.router.navigate(['admin']);
        })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

}
