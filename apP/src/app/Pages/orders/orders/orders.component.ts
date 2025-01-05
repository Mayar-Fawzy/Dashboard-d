import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/Services/auth.service';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
 private readonly _AuthService=inject(AuthService);
 loading:boolean=false;
 ResultOrders:any=[];
 numberr=10;
  numbers = [5, 15, 20, 30, 40];
  currentPage!: number;
  count:number=1;
  numberOfPages=0;
 ngOnInit(): void {
  this.GetAllOrder(this.currentPage,this.numberr)
 }
 GetAllOrder(page:number,limit:number){
   this._AuthService.GetAllOrders(page,limit).subscribe((res)=>{
    this.loading=true;
    this.ResultOrders=res.data;
    console.log(this.ResultOrders)
   })
 }
 
numberChange(event:any):void{
  this.numberr=+event.target.value;
  this.currentPage=1;
  this.GetAllOrder(this.currentPage,this.numberr)
}


 
navigateToAnotherPage() {
 this.count++;
 this. _AuthService.GetAllOrders(this.count,this.numberr).subscribe((response) =>{
   this.ResultOrders=response.data})

}

navigateToPreviosPage(){
 this.count--;
 this. _AuthService.GetAllOrders(this.count,this.numberr).subscribe((response) =>{
   this.ResultOrders=response.data})
}
goToPage(page: number): void {
 if (this.count >= 1 && this.count<= this.numberOfPages) {
   this.currentPage = page;
   this. _AuthService.GetAllOrders(this.count,this.numberr).subscribe((response) =>{
   this.ResultOrders=response.data})
 }
}
}
