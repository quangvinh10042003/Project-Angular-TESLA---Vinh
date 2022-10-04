import { Injectable } from "@angular/core";
@Injectable({
    providedIn: "root"
})
export class Account {
    id?:number;
    name?:string;
    address?:string;
    email?:string;
    password?:string;
    gender?:string;
    telephoneNumber?:number;
    cart?:any;
    history?:any;
}
