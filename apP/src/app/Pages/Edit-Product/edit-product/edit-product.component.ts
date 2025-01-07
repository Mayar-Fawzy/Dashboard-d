import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/Services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {
     private readonly _AuthService=inject(AuthService)
     private readonly _ActivatedRoute=inject(ActivatedRoute)
     private readonly _Router=inject(Router)
     productId: string;
     isloading: boolean = false;
     EditedProduct!: FormGroup;
     constructor() {
      this.productId = this._ActivatedRoute.snapshot.paramMap.get('id')!;
     }
     ngOnInit(): void {
      this.GetDetails();
     }
     GetDetails(){
          this._AuthService.EditProductById(this.productId).subscribe((res)=>{
            this.EditedProduct = new FormGroup({ 
              nameProduact: new FormControl(res.nameProduact, [Validators.required,Validators.minLength(3),Validators.maxLength(40)]),
              Image: new FormControl(res.Image, [Validators.required]),
              price: new FormControl(res.price, [Validators.required]),
              Qty: new FormControl(res.Qty, [Validators.required]),
              dec: new FormControl(res.dec, [Validators.required]),
              subTitle: new FormControl(res.subTitle, [Validators.required]),
              Title: new FormControl(res.Title, [Validators.required]),
              depart: new FormControl(res.depart, [Validators.required]),
              trans: new FormControl(res.trans, [Validators.required]),
            });
          })
     }
}
