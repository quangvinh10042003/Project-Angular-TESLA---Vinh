import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehical } from '../models/vehical';
const urlAPIVehical = "https://json-server-tesla.vercel.app/product"
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
  editItem(id:number, data:Vehical):Observable<any>{
    return this.http.put(`${urlAPIVehical}/${id}`,data);
  }
  deleteItem(id:number):Observable<any>{
    return this.http.delete(`${urlAPIVehical}/${id}`);
  }
  addItem(data:Vehical):Observable<any>{
    return this.http.post(`${urlAPIVehical}`,data)
  }
}
