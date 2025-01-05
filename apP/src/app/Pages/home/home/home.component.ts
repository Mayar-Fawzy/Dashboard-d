import { Component } from '@angular/core';
import { ContentComponent } from "../../content/content/content.component";
import { SliderComponent } from "../../Slider/slider/slider.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ SliderComponent,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
