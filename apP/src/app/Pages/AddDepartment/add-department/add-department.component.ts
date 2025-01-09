import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../../core/Services/auth.service';

@Component({
  selector: 'app-add-department',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './add-department.component.html',
  styleUrl: './add-department.component.scss'
})
export class AddDepartmentComponent {
   private readonly _AuthService=inject(AuthService)
     private readonly _ActivatedRoute=inject(ActivatedRoute)
     private readonly _Router=inject(Router)
     departId: string;
     isloading: boolean = false;
     AddedDepart!: FormGroup;
     constructor() {
      this.departId = this._ActivatedRoute.snapshot.paramMap.get('id')!;
     }
     ngOnInit(): void {
      this.GetDetails();
     }
     GetDetails(){
          this._AuthService.EditDepartById(this.departId).subscribe((res)=>{
            this.AddedDepart = new FormGroup({ 
              nameDepart: new FormControl(res.nameDepart, [Validators.required,Validators.minLength(3),Validators.maxLength(40)]),
              image: new FormControl(res.image, [Validators.required]),
              numberofdepart: new FormControl(res.numberofdepart, [Validators.required]),
              RouteCategory:new FormControl(res.RouteCategory,[Validators.required]),
              title: new FormControl(res.title, [Validators.required]),
           
            });
          })
     }
     AddDepart(AddedDepart:FormGroup){
      if(AddedDepart.valid){
        this.isloading = true;
        this._AuthService.AddDepart(AddedDepart.value).subscribe((res)=>{
          this._Router.navigate(['/home/Department'])
        })
      }
      
     }
 }
