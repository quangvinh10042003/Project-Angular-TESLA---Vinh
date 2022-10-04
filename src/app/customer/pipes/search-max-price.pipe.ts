import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchMaxPrice'
})
export class SearchMaxPricePipe implements PipeTransform {

  transform(list: any[], maxPrice?:number): any[] {

    if(maxPrice){
      return list.filter(data=>{
        return parseInt(data.price) <= maxPrice;
      })
    }else{
      return list;
    }
  }

}
