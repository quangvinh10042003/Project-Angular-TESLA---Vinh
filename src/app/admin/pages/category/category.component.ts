import { FormGroup, FormControl } from '@angular/forms';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  cardAdd:boolean = false;
  listCategory:any;
  formGroup = new FormGroup({
    id:new FormControl(''),
    category_id:new FormControl(''),
    name:new FormControl(''),
  })
  formGroupAdd = new FormGroup({
    id:new FormControl(''),
    category_id:new FormControl(''),
    name:new FormControl(''),
  })
  constructor(private category: CategoryService) { }

  ngOnInit(): void {
    this.getAll();
  }
  get form():any{
    return this.formGroup.controls
  }
  get form2():any{
    return this.formGroupAdd.controls
  }
  getAll(){
    this.category.getAll().subscribe(data=>{
      this.listCategory = data;
    })
  }
  edit(id:number){
    let inputId = document.getElementById(`inputId${id}`) as HTMLInputElement | null;
    let inputName = document.getElementById(`inputName${id}`) as HTMLInputElement | null;
    let spanId = document.getElementById(`spanId${id}`) as HTMLSpanElement | null;
    let spanName = document.getElementById(`spanName${id}`) as HTMLSpanElement | null;
    let save = document.getElementById(`save${id}`) as HTMLButtonElement | null;
    let cancel = document.getElementById(`cancel${id}`) as HTMLButtonElement | null;
    inputId?.classList.remove('d-none');
    inputName?.classList.remove('d-none');
    spanId?.classList.add('d-none');
    spanName?.classList.add('d-none');
    save?.classList.remove('d-none');
    cancel?.classList.remove('d-none');
    this.category.getItem(id).subscribe((data)=>{
      this.formGroup.patchValue(data);
    })
  }
  delete(id:number){
    this.category.deleteItem(id).subscribe((data)=>{
      if(data){
        this.getAll();
      }
    });
  }
  submit(id:number){
    this.category.editItem(id,this.formGroup.value).subscribe(()=>{
      this.getAll();
    })
  }
  submitAdd(){
    this.category.addItem(this.formGroupAdd.value).subscribe(()=>{
      this.getAll();
    })
  }
  closeBox(){
    let box = document.getElementById('addBox') as HTMLDivElement | null;
    box?.classList.add('d-none');
  }
  openBox(){
    let box = document.getElementById('addBox') as HTMLDivElement | null;
    box?.classList.remove('d-none');
  }
  closeEdit(id:number){
    let inputId = document.getElementById(`inputId${id}`) as HTMLInputElement | null;
    let inputName = document.getElementById(`inputName${id}`) as HTMLInputElement | null;
    let spanId = document.getElementById(`spanId${id}`) as HTMLSpanElement | null;
    let spanName = document.getElementById(`spanName${id}`) as HTMLSpanElement | null;
    let save = document.getElementById(`save${id}`) as HTMLButtonElement | null;
    let cancel = document.getElementById(`cancel${id}`) as HTMLButtonElement | null;
    inputId?.classList.add('d-none');
    inputName?.classList.add('d-none');
    spanId?.classList.remove('d-none');
    spanName?.classList.remove('d-none');
    save?.classList.add('d-none');
    cancel?.classList.add('d-none');
  }
}
