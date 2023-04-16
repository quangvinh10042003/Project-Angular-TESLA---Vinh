import { Account } from './../models/account';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const urlAPIAccount = "https://json-tesla.onrender.com/account"
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  totalCard = new Subject<number>();
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }
  addItem(data:Account):Observable<Account>{
    return this.http.post(urlAPIAccount,data)
  }
  getAll():Observable<Account[]>{
    return this.http.get<Account[]>(urlAPIAccount);
  }
  getItem(id:number):Observable<any>{
    return this.http.get<Account>(`${urlAPIAccount}/${id}`)
  }
  deleteItem(id:number):Observable<Account>{
    return this.http.delete(`${urlAPIAccount}/${id}`)
  }
  editItem(id:number, data:Account):Observable<any>{
    return this.http.put(`${urlAPIAccount}/${id}`,data);
  }
}
