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
  // private readonly _AuthService=inject(AuthService);
  //   private _router = inject(Router);
  //   isloading: boolean = false;
}
