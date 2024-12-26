import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [NgIf, HttpClientModule, FormsModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})

export class WeatherComponent implements OnInit {
  //@Input() text: any;
  //@Input() color: any;
  text: any = 'Weathering';
  color: any = 'green'

  private APIurl: string = 'https://api.open-meteo.com/v1/forecast?';

  responseData: any;
  temperature: number | null = null;
  humidity: number | null = null;
  weatherCode: string = '';
  latitude: number | null = null;
  longitude: number | null = null;
  errorMsg: string = '';
  hidden: boolean = true;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void { }

  getWeather(): void {
    this.inputValidate();

    // Clear any previous error message
    this.errorMsg = '';

    let API_URL: string = this.APIurl;
    API_URL += 'latitude=' + this.latitude + '&longitude=' + this.longitude + 
    '&current=temperature_2m,relative_humidity_2m,weather_code';

    this.fetch_WeatherData(API_URL);
  }

  fetch_WeatherData(URL:string)
  {
    console.log(URL);
    this.http.get<any>(URL).subscribe({
      next: (data) => {
        this.responseData = data;
        this.temperature = this.responseData?.current?.temperature_2m ?? null;
        this.humidity = this.responseData?.current?.relative_humidity_2m ?? null;
        this.weatherCode = this.responseData?.current?.weather_code ?? '';

        // Manually trigger change detection
        this.cdr.detectChanges();
        this.hidden = false
      },
      error: (err) => {
        this.errorMsg = 'Error fetching weather data. Please try again.';
        this.cdr.detectChanges(); // Trigger change detection after error
      }
    });
  }

  inputValidate()
  {
    if (this.latitude === null || this.longitude === null) {
      this.errorMsg = 'Please enter valid latitude and longitude.';
      return;
    }

    if (isNaN(this.latitude) || isNaN(this.longitude)) {
      this.errorMsg = 'Latitude and longitude must be numeric values.';
      return;
    }
    // Check if the latitude and longitude are within valid ranges
    if (this.latitude < -90 || this.latitude > 90) {
      this.errorMsg = 'Latitude must be between -90 and 90.';
      return;
    }

    if (this.longitude < -180 || this.longitude > 180) {
      this.errorMsg = 'Longitude must be between -180 and 180.';
      return;
    }
  }

  fetch_temp(): number {
    return this.responseData?.current?.temperature_2m ?? null;
  }

  fetch_humidity(): number {
    return this.responseData?.current?.relative_humidity_2m ?? null;
  }

  fetch_weather(): string {
    return this.responseData?.current?.weather_code ?? null;
  }

  getWeatherDescription(code_str: string): string {
    let code: number = parseInt(code_str);
    switch (code) {
      case 0: return 'Clear sky';
      case 1: return 'Mainly clear';
      case 2: return 'Partly cloudy';
      case 3: return 'Overcast';
      case 45: return 'Fog';
      case 48: return 'Depositing rime fog';
      case 51: return 'Light drizzle';
      case 53: return 'Moderate drizzle';
      case 55: return 'Dense drizzle';
      case 61: return 'Light rain showers';
      case 63: return 'Moderate rain showers';
      case 65: return 'Heavy rain showers';
      case 71: return 'Light snow showers';
      case 73: return 'Moderate snow showers';
      case 75: return 'Heavy snow showers';
      case 80: return 'Light rain showers';
      case 81: return 'Moderate rain showers';
      case 82: return 'Heavy rain showers';
      case 85: return 'Light snow showers';
      case 86: return 'Heavy snow showers';
      case 95: return 'Thunderstorm';
      case 96: return 'Thunderstorm with light hail';
      case 99: return 'Thunderstorm with heavy hail';
      default: return 'Unknown weather condition';
    }
  }
}

