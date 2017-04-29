import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'search'
})
@Injectable()
export class SearchPipe {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value:any[], args:any) {

    if(value == undefined){
        value = [];
    }


    return value.filter((item)=>(
                        (item.title.toLowerCase().indexOf(args.toLowerCase()) !== -1) || args==undefined  || 
                        (item.content.toLowerCase().indexOf(args.toLowerCase()) !== -1) || args==undefined ));
  }
}
