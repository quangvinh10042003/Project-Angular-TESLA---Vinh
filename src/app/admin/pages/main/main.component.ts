import { CategoryService } from './../../../services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductAcessoryService } from 'src/app/services/product-acessory.service';
import { VehicalService } from './../../../services/vehical.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  keyword:string = "";
  categoryList:any;
  allProduct: any = [];
  itemChose: any;
  constructor(private vehicalSer: VehicalService, private AccessorySer: ProductAcessoryService, private router: Router, private categorySer: CategoryService, private actRout: ActivatedRoute) { }

  ngOnInit(): void {
   // lấy sản phẩm theo category
    this.takeItemByCategory();
    // lấy ra category 
    this.categorySer.getAll().subscribe(data=>{
      this.categoryList = data;
    })  
  } 
  takeItemByCategory(){
    let id: any = this.actRout.snapshot.params['id'];
    this.actRout.paramMap.subscribe(data => {
      this.allProduct = [];
      id = data.get('id');
      if (id) {
        this.vehicalSer.getAll().subscribe(data => {
          data.map(item => {
            if(id == item.category_id){
              this.allProduct.push(item);
            }else{}
          })
        })
        this.AccessorySer.getAll().subscribe(data => {
          data.map(item => {
            if(id == item.category_id){
              this.allProduct.push(item);
            }else{}
          })
        })
      } 
      else {
        this.takeAllItems();
      }
    })
  };

  takeAllItems(){
    this.vehicalSer.getAll().subscribe(data => {
      data.map(item =>{
        this.allProduct.push(item);
      })
    })
    this.AccessorySer.getAll().subscribe(data => {
      data.map(item =>{
        this.allProduct.push(item);
      })
    })
  };

  changeStatus(category_id: number, id: number) {
    let data = this.allProduct.find((item: any) => {
      return item.id == id && item.category_id == category_id;
    })
    if (category_id == 1) {
      this.vehicalSer.editItem(id, data).subscribe();
    }else{
      this.AccessorySer.editItem(id,data).subscribe();
    }
  };
  searchByCategory(id:any){
    this.router.navigate([`/admin/list/${id}`]);
  }
  deleteItem(category_id:number, id:number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your product has been deleted.',
          'success'
        )
        if(category_id == 1){
          this.vehicalSer.deleteItem(id).subscribe(
            data=>{
              if(data){
                this.takeItemByCategory();
              }
            }
          );
        }else{
          this.AccessorySer.deleteItem(id).subscribe(data=>{
            if(data){
              this.takeItemByCategory();
            }
          });
        }
      }
    })
  }
  viewDetail(category_id:number, id:number){
    if(category_id == 1){
      this.router.navigate([`/detail/${id}`]);
    }else{
      this.router.navigate([`/detailAccessory/${id}`]);
    }
  }
  editItem(category_id:number, id:number){
    if(category_id == 1){
      this.router.navigate([`/admin/edit/${id}`]);
    }else{
      this.router.navigate([`/admin/editAccessory/${id}`]);
    }
  }
}
