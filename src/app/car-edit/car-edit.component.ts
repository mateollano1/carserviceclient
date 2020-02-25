import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { OwnerService } from '../shared/owner/owner.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit, OnDestroy {
  car: any = {};
  owner: any[]
  sub: Subscription;
  ownerName: string = "Propietario"
  formEdit: FormGroup
  ownerIdSelected: string =''

  constructor(private route: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private giphyService: GiphyService,
    private ownerService: OwnerService) {
  }

  ngOnInit() {
    this.formEdit = new FormGroup({
      href: new FormControl(''),
      name: new FormControl(''),
      ownerDni: new FormControl('')

    })
    this.getOwners()
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.carService.get(id).subscribe((car: any) => {
          if (car) {
            console.log(car);
            if (car['ownerDni'] !== null) {
              this.getOwner(car['ownerDni'])
            }
            this.car = car;
            this.car.href = car._links.self.href;
            this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
          } else {
            console.log(`Car with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/car-list']);
  }
  guardar(owner: any) {
    // console.log("hello");
    console.log(owner);
    this.ownerIdSelected = owner
  }

  save(form: NgForm) {
    console.log(form['href']);
    if (form['href'] == undefined) {
      console.log("unde");
      
      this.formEdit.setValue({
        name: form.name,
        href: "",
        ownerDni: this.ownerIdSelected
      })
    }else{
      this.formEdit.setValue({
        name: form.name,
        href: form['href'],
        ownerDni: this.ownerIdSelected
      })
    }
    console.log(this.formEdit.value);
    
    // console.log(form);
    // form.addFormGroup
    this.carService.save(this.formEdit.value).subscribe(result => {
      console.log(result);
      
      this.gotoList();
    }, error => console.error(error));
  }
  getOwners() {
    this.ownerService.getOwners().subscribe(data => {
      console.log(data['_embedded']);
      this.owner = data['_embedded']['owners']
      console.log(this.owner);
    })
  }
  getOwner(id: string) {
    console.log(id);
    for (let index = 0; index < this.owner.length; index++) {
      const element = this.owner[index]['dni'];
      if (element == id) {
        this.ownerName = this.owner[index]['name']
      }

    }

  }
  remove(href) {
    this.carService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
}

