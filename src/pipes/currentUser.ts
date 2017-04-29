import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'currentUser'
})
@Injectable()
export class CurrentUserPipe {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value:any[], args:any) {

    if(value == undefined){
        value = [];
    }

    return value.filter((item)=>( item.userid==args.id ));
  }
}
