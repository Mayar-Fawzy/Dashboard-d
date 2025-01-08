import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from 'express';
import { AuthService } from '../../../core/Services/auth.service';

@Component({
  selector: 'app-addproducts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './addproducts.component.html',
  styleUrl: './addproducts.component.scss'
})
export class AddproductsComponent {
  private readonly _AuthService=inject(AuthService);
    private _router = inject(Router);
    isloading: boolean = false;
  addProduct: FormGroup = new FormGroup({
    nameProduact: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),
    ]),
    Image: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    Qty: new FormControl(null, [Validators.required]),
    dec: new FormControl(null),
    subTitle: new FormControl(null, [Validators.required]),
    Title: new FormControl(null, [Validators.required]),
    depart: new FormControl(null, [Validators.required]),
    trans: new FormControl(null, [Validators.required]),
    Rating : new FormControl(null, [Validators.required]),

    RouteCategory: new FormControl(null, [Validators.required]),

});
}
