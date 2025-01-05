import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/Services/auth.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {
  private readonly _AuthServies=inject(AuthService)
  loading:boolean=false;
  searchInput:string=''
   resultUser:any=[]
   count:number=1;
   totalUserss:Number=0
   numberOfPages = 0;
  numberr=10;
  numbers = [5, 15, 20, 30, 40];
  currentPage!: number;
      ngOnInit(): void{
      this.GetAllUser(this.currentPage,this.numberr)
}


numberChange(event:any):void{
   this.numberr=+event.target.value;
   this.currentPage=1;
   this.GetAllUser(this.currentPage,this.numberr)
}


  GetAllUser(page:number,limit:number){
  
  this._AuthServies.GetUsers(page,limit).subscribe((response)=>{
    this.loading=true;
    this.totalUserss=response.totalUsers;
    this.numberOfPages = response.metadata.numberOfPages;
    this.resultUser=response.users;
    console.log(this.resultUser)
  })
 }
  
navigateToAnotherPage() {
  this.count++;
  this._AuthServies.GetUsers(this.count,this.numberr).subscribe((response) =>{
    this.resultUser=response.users})

}

navigateToPreviosPage(){
  this.count--;
  this._AuthServies.GetUsers(this.count,this.numberr).subscribe((response) =>{
    this.resultUser=response.users})
}
goToPage(page: number): void {
  if (this.count >= 1 && this.count<= this.numberOfPages) {
    this.currentPage = page;
  }
}
search():void{

   this.loading=true;
 
    this._AuthServies.Search(this.searchInput,this.currentPage,this.numberr).subscribe((res)=>{
    
     
      this.resultUser=res.users;
      
      console.log(this.resultUser)
  
    },
   error=>{
    this.loading=false;
    console.log(error);
   }
  )
    
 }

}
