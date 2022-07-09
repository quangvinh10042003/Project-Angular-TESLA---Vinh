import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(list: any[], keyword?:string): any[] {

    if(keyword){
      keyword = keyword.toLocaleLowerCase();
      return list.filter(data=>{
        return data.name.toLocaleLowerCase().includes(keyword);
      })
    }else{
      return list;
    }
  }

}
