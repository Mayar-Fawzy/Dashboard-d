import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

import { Iuser } from '../Interface/iuser';
import { environment } from '../../Environment/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userdata:any=null;
saveuserdata():void{
if(localStorage.getItem('userToken')!==null){
  this.userdata=jwtDecode(localStorage.getItem('userToken')!)
}
}
private readonly _Router= inject(Router);

logout():void{
  localStorage.removeItem('userToken');
  this._Router.navigate(['/login']);
}
  private readonly _HttpClient=inject (HttpClient);
  Login(userdata:Iuser):Observable<any>
  {
    return  this._HttpClient.post(`${environment.baseUrl}${environment.LoginRout}`,userdata)
  }
  GetUsers(page:number, limit:number):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}${environment.UserRout}?limit=${limit}&page=${page}`)
  }
  GetAllOrders(page:number, limit:number):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}${environment.Orders}?limit=${limit}&page=${page}`)
  }
  
  // Products
  getProducts(): Observable<any> {
    return this._HttpClient.get(environment.UrlProduct);
  }
  DeleteProduct(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.UrlProduct}/${id}`);
   
  }
  EditProductById(id:string):Observable<any>{
    return this._HttpClient.get(`${environment.UrlProduct}/${id}`);
  }
  updateProduct(id: string, product: any): Observable<any> {
    return this._HttpClient.put(`${environment.UrlProduct}/${id}`, product);
  }
  AddProducts(Product: object):Observable<any>{
    return this._HttpClient.post(`${environment.UrlProduct}` ,Product)
  }
  Search(searchinput:string,page:number=1, limit:number=10):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}${environment.UserRout}?name=${searchinput}`)
  }
  //Depart
  GetDepatrs():Observable<any>{
    return this._HttpClient.get(`${environment.UrlDepart}`);
  }
  EditDepartById(id:string):Observable<any>{
    return this._HttpClient.get(`${environment.UrlDepart}/${id}`);
  }
  DeleteDepart(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.UrlDepart}/${id}`);
   
  }
  updatedepart(id:string , derpart:any):Observable<any>{
     return this._HttpClient.put(`${environment.UrlDepart}/${id}`,derpart);
  }
  AddDepart(depart:any):Observable<any>{
    return this._HttpClient.post(`${environment.UrlDepart}`,depart)
  }
}
