import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehical } from '../models/vehical';
const urlAPIVehical = "http://localhost:3000/product"
@Injectable({
  providedIn: 'root'
})
export class VehicalService {

  constructor(private http: HttpClient) { }
  getAll():Observable<Vehical[]>{
    return this.http.get<Vehical[]>(urlAPIVehical);
  }
  getItem(id:number):Observable<Vehical>{
    return this.http.get<Vehical>(`${urlAPIVehical}/${id}`);
  }
  editItem(id:number, data:Vehical){
    return this.http.put(`${urlAPIVehical}/${id}`,data);
  }
  deleteItem(id:number){
    return this.http.delete(`${urlAPIVehical}/${id}`);
  }
  addItem(data:Vehical){
    return this.http.post(`${urlAPIVehical}`,data)
  }
}
