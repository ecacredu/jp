import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'city'
})
@Injectable()
export class CityPipe {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value:any[], args:any) {

    if(value == undefined){
        value = [];
    }

    return value.filter((item)=>( item.cityid==args || args==undefined || args==null || args=='231234234'));
  }
}
