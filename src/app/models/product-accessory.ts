import { Injectable } from "@angular/core";
@Injectable({
    providedIn: "root"
})
export class ProductAccessory {
    id?: string;
    category_id?: number;
    name?: string;
    price?: number;
    description?: string;
    imgProduct?:string;
    allImg?:any;
    inHome?: boolean;
    inTopSeller?: boolean;
}
