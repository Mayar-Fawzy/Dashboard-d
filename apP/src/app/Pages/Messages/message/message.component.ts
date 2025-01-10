import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/Services/auth.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../core/Pipes/search.pipe';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchPipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
   private readonly _AuthService=inject(AuthService);
   PagenationMessages: any[] = []
   numbers = [5,10, 25, 100];
   Departs: any[] = [];
   searchInput!:string;
    pageSize = 10;
   currentPage = 1; 
    length = 0;
   loading:boolean=false;
   MessageInfo:any[]=[];
   ngOnInit(): void {
   this.GetAllMessage()
   }
   GetAllMessage(){
     return this._AuthService.GetMessage().subscribe((res)=>{
      this.loading=true;
      this.MessageInfo=res;
      this.length=this.MessageInfo.length;
      this.UpdatePages(); 
      
      console.log(this.MessageInfo)
     })
   }
   DeleteMessage(id:string){
   
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
            this._AuthService.DeleteMessage(id).subscribe((Res)=>{
              console.log('DoneDelete');
           this.GetAllMessage();
           })
          }
        });
        
   }
   UpdatePages():void{
    const Started=(this.currentPage - 1) * this.pageSize;
    const End= Started+ this.pageSize;
    this.PagenationMessages=this.MessageInfo.slice(Started,End);
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
