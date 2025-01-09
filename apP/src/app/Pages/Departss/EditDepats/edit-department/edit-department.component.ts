
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../../../core/Services/auth.service';

@Component({
  selector: 'app-edit-department',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './edit-department.component.html',
  styleUrl: './edit-department.component.scss'
})
export class EditDepartmentComponent {
 
  private readonly _AuthService=inject(AuthService);
  private readonly _Router=inject(Router);
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  departId:string;
  isloading:boolean=false;
  Editeddepart!:FormGroup;
    constructor(){
      this.departId=this._ActivatedRoute.snapshot.paramMap.get('id')!;
    }


     ngOnInit(): void {
      this.GetDetails();
     }
     GetDetails(){
          this._AuthService.EditDepartById(this.departId).subscribe((res)=>{
           
            this.Editeddepart=new FormGroup({ 
              nameDepart:new FormControl(res.nameDepart,[Validators.required,Validators.minLength(3),Validators.maxLength(40)]),
              image:new FormControl(res.image,[Validators.required]),
              numberofdepart:new FormControl(res.numberofdepart,[Validators.required]),
              title:new FormControl(res.title,[Validators.required])
          });
        })
     }
     updatedepart(): void {
      if (this.Editeddepart.valid) {
        this.isloading = true;
        this._AuthService.updatedepart(this.departId, this.Editeddepart.value).subscribe(
          (response) => {
            console.log();
            this.isloading = false;
          
            this._Router.navigate(['home/Department']);
          },
          (error) => {
            this.isloading = false;
            
          }
        );
      }
    }
}
