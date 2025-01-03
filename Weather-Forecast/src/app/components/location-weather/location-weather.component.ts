import { ChangeDetectorRef, Component, input, OnInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FetchDataService } from '../../services/fetch-data.service';
import { Position } from '../../models/position'
import { Weather } from '../../models/weather';
import { WeatherDescription } from '../../models/weather-description'

@Component({
  selector: 'app-location-weather',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './location-weather.component.html',
  styleUrl: './location-weather.component.css'
})
export class LocationWeatherComponent implements OnInit {

  ngOnInit(): void {  }
  
  constructor(private cdr: ChangeDetectorRef, private fds: FetchDataService) {}

  text: string = 'Get position';
  input_city: string = '';
  city: string = '';
  errorMsg: string|null = null;
  hidden: boolean = true;
  temperature: string = '';
  humidity: string = '';
  weatherCode: string = '100';
  position: any = Position;
  weather: any = Weather;

  async fetchData(){
    await this.getPosition();
    this.weather = await this.fds.getWeather(this.position);

    this.temperature = this.weather.temperature;
    this.humidity = this.weather.humidity;
    this.weatherCode = this.weather.weather_code;
    this.city = this.input_city;
    this.cdr.detectChanges();
    this.hidden = false;    
  }

  async getPosition() {
    this.position = await this.fds.getPosition(this.input_city);
  }  

  getWeatherDescription(weather_code:string){
    return WeatherDescription.weather_desc[Number(weather_code)];
  }
}
