import { Injectable } from "@angular/core";
@Injectable({
    providedIn: "root"
})
export class Account {
    id?:number;
    firstName?:string;
    lastName?:string;
    email?:string;
    password?:string;
}
