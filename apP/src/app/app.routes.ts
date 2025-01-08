import { Routes } from '@angular/router';
 import { NotfoundComponent } from './Components/NotFound/notfound/notfound.component';
import { LoginComponent } from './Pages/Auth/login/login.component';
import { HomeComponent } from './Pages/home/home/home.component';
import { authGuard } from './core/Guards/auth.guard';
import { SliderComponent } from './Pages/Slider/slider/slider.component';
import { ContentComponent } from './Pages/content/content/content.component';
import { OrdersComponent } from './Pages/orders/orders/orders.component';
import { ProductsComponent } from './Pages/products/products/products.component';
import { AddproductsComponent } from './Pages/Addproduct/addproducts/addproducts.component';
import { MessageComponent } from './Pages/Messages/message/message.component';
import path from 'node:path';
import { Component } from '@angular/core';
import { EditedProductComponent } from './Pages/Edit-Product/edit-product/edit-product.component';

export const routes: Routes = [
    {path:'' ,redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'home',
        canActivate:[authGuard],
        component:HomeComponent,
        children:
    [   {path:'',component:ContentComponent},
        {path:'content',component:ContentComponent},
        {path:'orders',component:OrdersComponent},
       
        {path:'products',component:ProductsComponent},
        { path: 'products/edit/:id', component: EditedProductComponent }
        ,
        {path:'Addproducts',component:AddproductsComponent},
        {path:'Message', component:MessageComponent},
        {path:'slider',component:SliderComponent},
    
    ]
    },
   
    {path:'**',component:NotfoundComponent}
];
