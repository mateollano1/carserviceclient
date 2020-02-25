import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { CarListComponent } from './car-list/car-list.component';

import { MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarEditComponent } from './car-edit/car-edit.component';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CarOwnersComponent } from './car-owners/car-owners.component';
import {MatDividerModule} from '@angular/material/divider';
@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    CarEditComponent,
    CarOwnersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    MatSelectModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
