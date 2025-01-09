import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproducts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './addproducts.component.html',
  styleUrl: './addproducts.component.scss'
})
export class AddproductsComponent {
  private readonly _AuthService=inject(AuthService)
  private readonly _Router =inject(Router);
  isloading :boolean= false;
   AddedProduct:FormGroup = new FormGroup({ 
    nameProduct: new FormControl('', [Validators.required , Validators.minLength(3),Validators.maxLength(30)]),
    Image:new FormControl('',[Validators.required]),
    price: new FormControl('', [Validators.required]),
    Qty:new FormGroup('',[Validators.required]),
    dec:new FormControl('',[Validators.required]),
    subTitle:new FormControl('',[Validators.required]),
    Title:new FormControl('',[Validators.required]),
    depart:new FormControl('',[Validators.required]),
    trans:new FormControl('',[Validators.required]),
    Rating:new FormControl('',[Validators.required]),
    RouteCategory:new FormControl('',[Validators.required])
   });
  //   addProduct: FormGroup  =new FormGroup({
  //    nameProduact:new FormControl(null,[Validators.required , Validators.minLength(3),Validators.maxLength(30)]),
  //    Image:new FormControl(null,[Validators.required]),
  //  );
}
