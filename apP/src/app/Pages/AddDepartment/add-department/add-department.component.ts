import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/Services/auth.service';

@Component({
  selector: 'app-add-department',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-department.component.html',
  styleUrl: './add-department.component.scss',
})
export class AddDepartmentComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  isloading: boolean = false;
  AddedDepart: FormGroup = new FormGroup({
    nameDepart: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),
    ]),
    image: new FormControl('', [Validators.required]),
    numberofdepart: new FormControl('', [Validators.required]),
    RouteCategory: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
  });

  AddDepart(AddedDepart: FormGroup) {
    if (AddedDepart.valid) {
      this.isloading = true;
      this._AuthService.AddDepart(AddedDepart.value).subscribe((res) => {
        this._Router.navigate(['/home/Department']);
      });
    }
  }
}
