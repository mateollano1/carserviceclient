import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../shared/owner/owner.service';

@Component({
  selector: 'app-car-owners',
  templateUrl: './car-owners.component.html',
  styleUrls: ['./car-owners.component.css']
})
export class CarOwnersComponent implements OnInit {

  owners: any []
  ownerSelected: any [] = []
  constructor(private ownerService:OwnerService) { }

  ngOnInit() {
    this.getOwners()
  }

  getOwners(){
    this.ownerService.getOwners().subscribe(data => {
      console.log(data['_embedded']['owners']);
      this.owners = data['_embedded']['owners']
      for (let index = 0; index < this.owners.length; index++) {
        this.ownerSelected[index] = false
      }
      console.log(this.ownerSelected);
      
    })
  }
  delete(){
    for (let index = 0; index < this.ownerSelected.length; index++) {
      const element = this.ownerSelected[index];
      if (element) {
        console.log(this.owners[index]['_links']['self']['href']);
        
        let href = this.owners[index]['_links']['self']['href']
        this.ownerService.deleteOwner(href).subscribe(data => {console.log(data)
        this.owners.splice(index,1)});
      }
    }
  }
  select(i: number){
    this.ownerSelected[i] = !this.ownerSelected[i]
    console.log(this.ownerSelected);
    
  }

}
