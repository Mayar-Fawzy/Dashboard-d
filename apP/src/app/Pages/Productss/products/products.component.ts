import { CommonModule } from '@angular/common';
import { Component, Inject, inject, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/Services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SearchPipe } from "../../../core/Pipes/search.pipe";


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  
// 
  private readonly _AuthService=inject(AuthService);
  private _router = inject(Router);
  loading:boolean=false;
  searchInput!:string;
  ResultProducts:any=[];
  paginatedProducts: any[] = []
   numbers = [5,10, 25, 100];
   products: any[] = [];
    pageSize = 10;
   currentPage = 1; 
    length = 0;
 
   
  ngOnInit(): void {
   this.GetAllProducts();
   this.sortProductsByNewest();
   
   
  }

    //^ Method to sort products by their creation date in descending order
    sortProductsByNewest(): void {
      this.ResultProducts.sort((a:any, b:any) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    }
  GetAllProducts(){
    this.loading = false;
    
    this._AuthService.getProducts().subscribe({
      next: (res) => { 
         this.loading = true;
        this.ResultProducts = res;
        this.length = this.ResultProducts.length;
        this.sortProductsByNewest();
        this.UpdatePages();
      // Set noResults if no products are found
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
    
      },
    });

  }
  DeleteProduct(id:string){
    
  // SweetAlert2
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
 ///////////////////////////
 
   UpdatePages():void{
      const Started=(this.currentPage - 1) * this.pageSize;
      const End= Started+ this.pageSize;
      this.paginatedProducts=this.ResultProducts.slice(Started,End);
   }
   //To Handle API That Without Limit & Page
   numberOfPages():number{ return Math.ceil(this.length/this.pageSize) }
 
 navigateToAnotherPage() {
  if(this.currentPage<this.numberOfPages()){
    
  this.currentPage++;
  this.UpdatePages();
 
  }
 }
 
 navigateToPreviosPage(){
  if(this.currentPage>1){
    this.currentPage--;
    this.UpdatePages();
  }
 
 }

 goToPage(page: number): void {
  if (page >= 1 && page<= this.numberOfPages()) {
    this.currentPage = page;
    this.UpdatePages();
  }
 }
 numberChange(event:Event):void{
  const selectElement = event.target as HTMLSelectElement;
  this.pageSize = +selectElement.value;
  this.currentPage = 1; 
  this.UpdatePages();
}


}
