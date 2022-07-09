import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchEmail'
})
export class SearchEmailPipe implements PipeTransform {

  transform(list: any[], keyword?:string): any[] {

    if(keyword){
      keyword = keyword.toLocaleLowerCase();
      return list.filter(data=>{
        return data.email.toLocaleLowerCase().includes(keyword);
      })
    }else{
      return list;
    }
  }

}
