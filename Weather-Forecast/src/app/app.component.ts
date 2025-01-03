import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { WeatherComponent } from './components/weather/weather.component';
import { AboutComponent } from './components/about/about.component';
import { FetchDataService } from './services/fetch-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, WeatherComponent, AboutComponent],
  providers: [FetchDataService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Weather-Forecast';
}
