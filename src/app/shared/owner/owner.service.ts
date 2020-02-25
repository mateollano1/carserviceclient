import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  public API = '//thawing-chamber-47973.herokuapp.com';
  public OWNER_API = this.API + '/owners';
  constructor(private http: HttpClient) {

   }
   getOwners(){
     return this.http.get(this.OWNER_API)
   }
   getOwner(id: string){
    return this.http.get(this.API + "/owners/search/findByDni/?dni=" + id )
  }
}
