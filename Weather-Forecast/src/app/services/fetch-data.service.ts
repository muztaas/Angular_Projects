import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Position } from '../models/position'
import { Weather } from '../models/weather'
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {

  constructor(private http: HttpClient) {}

  position = Position;
  weather = Weather;

  private URL_loc: string = 'https://api.geoapify.com/v1/geocode/search?text=';
  private key_loc: string = 'e4ada3c4495847d582a7896962288e9a';
  private query_string: string = '&lang=en&limit=10&type=city&format=json&apiKey=';

  private URL_wtr: string = 'https://api.open-meteo.com/v1/forecast?';
  private key_wtr: string = '&current=temperature_2m,relative_humidity_2m,weather_code';
  
  responseData: any;

  async getPosition(input_city: string) {
    let URL: string = this.URL_loc;
    URL += input_city + this.query_string + this.key_loc;
    let lat_long = await this.fetch_Location(URL);
    return lat_long;
  }  

  async fetch_Location(URL: string){
    const data = await firstValueFrom(this.http.get<any>(URL));
    this.responseData = data.results[0];
    this.position.latitude = this.responseData?.lat ?? null;
    this.position.longitude = this.responseData?.lon ?? null;
    return this.position;
  }

  async getWeather(pos = Position){
    let URL = this.URL_wtr;
    URL += 'latitude=' + pos.latitude + '&longitude=' + pos.longitude + this.key_wtr;
    let forecast: Weather = await this.fetchWeather(URL);
    return forecast;
  }

  async fetchWeather(URL: string){
    const data = await firstValueFrom(this.http.get<any>(URL));
    this.responseData = data.current;
    this.weather.temperature = this.responseData.temperature_2m;
    this.weather.humidity = this.responseData.relative_humidity_2m;
    this.weather.weather_code = this.responseData.weather_code;
    return this.weather;
  }
}