import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  private URL: string = 'https://api.geoapify.com/v1/geocode/search?text=';

  constructor(private httpClient: HttpClient) { }

  fetchData(city_name: string)
  {
    console.log(city_name)
    this.URL += city_name + '&lang=en&limit=10&type=city&format=json&apiKey=e4ada3c4495847d582a7896962288e9a';
    console.log(this.URL)

    return this.httpClient.get<any>(this.URL);
  }
}
