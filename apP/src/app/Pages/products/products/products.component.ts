import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/Services/auth.service';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  
// 
  private readonly _AuthService=inject(AuthService);
  private _router = inject(Router);
  loading:boolean=false;
  ResultProducts:any=[];
 
  numberr=10;
   numbers = [5, 15, 20, 30, 40];
   currentPage!: number;
   count:number=1;
   numberOfPages=0;
  ngOnInit(): void {
   this.GetAllProducts();
  }
  GetAllProducts(){
    this.loading = false;
    
    this._AuthService.getProducts().subscribe({
      next: (res) => { 
         this.loading = true;
        this.ResultProducts = res;
      // Set noResults if no products are found
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
    
      },
    });

  }
  DeleteProduct(id:string){
    

     Swal.fire({
      title: "هل متاكد من  الحذف ؟",
      
      icon: "error",
      showCancelButton: true,
      cancelButtonText:"غير متاكد",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "بألتاكيد"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "تم المسح",
        
          icon: "success"
        });
        this._AuthService.DeleteProduct(id).subscribe((Res)=>{
          console.log('DoneDelete');
       this.GetAllProducts();
       })
      }
    });
    
  }
  Edit(product: any){
    this._router.navigate(['/home/products/edit', product.id])
  }
 numberChange(event:any):void{
   this.numberr=+event.target.value;
   this.currentPage=1;
   this.GetAllProducts()
 }
 
 
  
 navigateToAnotherPage() {
  this.count++;
  this. _AuthService.getProducts().subscribe((response) =>{
    this.ResultProducts=response.data})
 
 }
 
 navigateToPreviosPage(){
  this.count--;
  this. _AuthService.getProducts().subscribe((response) =>{
    this.ResultProducts=response.data})
 }
 goToPage(page: number): void {
  if (this.count >= 1 && this.count<= this.numberOfPages) {
    this.currentPage = page;
    this. _AuthService.getProducts().subscribe((response) =>{
    this.ResultProducts=response.data})
  }
 }
}
