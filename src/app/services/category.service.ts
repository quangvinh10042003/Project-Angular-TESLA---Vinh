import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
const urlAPICategory = "https://json-tesla.onrender.com/category";
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
  editItem(id:number, data:Category):Observable<any>{
    return this.http.put(`${urlAPICategory}/${id}`,data);
  }
  deleteItem(id:number):Observable<any>{
    return this.http.delete(`${urlAPICategory}/${id}`);
  }
  addItem(data:Category):Observable<any>{
    return this.http.post(urlAPICategory,data);
  }
}
