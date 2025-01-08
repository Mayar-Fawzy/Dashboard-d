import { Component, inject } from '@angular/core';
import {  RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/Services/auth.service';
@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  isVisable:boolean=false;
  isVisable1:boolean=false;
  ShowOrHide(){
   this.isVisable=!this.isVisable;

  }
  ShowOrHide1(){
    this.isVisable1=!this.isVisable1;
  }
 readonly _Auth= inject(AuthService);
}
