import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../core/Pipes/search.pipe';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../core/Services/auth.service';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchPipe],
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss'
})
export class DepartmentComponent {
  private readonly _AuthService=inject(AuthService);
  private _router = inject(Router);
  loading:boolean=false;
  searchInput!:string;
  ResultDeparts:any=[];
  paginatedDeparts: any[] = []
   numbers = [5,10, 25, 100];
   Departs: any[] = [];
    pageSize = 10;
   currentPage = 1; 
    length = 0;
 
   
  ngOnInit(): void {
   this.GetAllDeparts();
   this.sortDepartsByNewest();
   
   
  }

    //^ Method to sort Departs by their creation date in descending order
    sortDepartsByNewest(): void {
      this.ResultDeparts.sort((a:any, b:any) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    }
  GetAllDeparts(){
    this.loading = false;
    
    this._AuthService.GetDepatrs().subscribe({
      next: (res) => { 
         this.loading = true;
        this.ResultDeparts = res;
        this.length = this.ResultDeparts.length;
        this.sortDepartsByNewest();
        this.UpdatePages();
      // Set noResults if no Departs are found
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
    
      },
    });

  }
  DeleteDepart(id:string){
    
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
        this._AuthService.DeleteDepart(id).subscribe((Res)=>{
          console.log('DoneDelete');
       this.GetAllDeparts();
       })
      }
    });
    
  }
  Edit(Depart: any){
    this._router.navigate(['/home/Department/editDepart', Depart.id])
  }
 ///////////////////////////
 
   UpdatePages():void{
      const Started=(this.currentPage - 1) * this.pageSize;
      const End= Started+ this.pageSize;
      this.paginatedDeparts=this.ResultDeparts.slice(Started,End);
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
