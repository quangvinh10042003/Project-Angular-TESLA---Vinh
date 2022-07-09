import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
const urlAPICategory = "http://localhost:3000/category";
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  getAll():Observable<Category[]>{
    return this.http.get<Category[]>(urlAPICategory);
  }
  getItem(id:number):Observable<Category>{
    return this.http.get<Category>(`${urlAPICategory}/${id}`);
  }
  editItem(id:number, data:Category){
    return this.http.put(`${urlAPICategory}/${id}`,data);
  }
  deleteItem(id:number){
    return this.http.delete(`${urlAPICategory}/${id}`);
  }
  addItem(data:Category){
    return this.http.post(urlAPICategory,data);
  }
}
