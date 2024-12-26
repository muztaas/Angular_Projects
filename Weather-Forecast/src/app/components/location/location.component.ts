import { ChangeDetectorRef, Component, input, OnInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
//import { FetchDataService } from '../../services/fetch-data.service';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [NgIf, FormsModule, HttpClientModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent implements OnInit {

  ngOnInit(): void {  }
  
  text: string = 'Get position';
  input_city: string = '';
  city: string = '';
  errorMsg: string|any = null;
  private URL: string = 'https://api.geoapify.com/v1/geocode/search?text=';
  responseData : any;
  hidden: boolean = true;
  latitude: string = '';
  longitude: string = '';

  //constructor(private fetchData : FetchDataService) {}

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  getPosition() {
    this.city = this.input_city;
    let API_URL: string = this.URL;
    API_URL += this.input_city + '&lang=en&limit=10&type=city&format=json&apiKey=e4ada3c4495847d582a7896962288e9a';
    this.fetch_Location(API_URL);
  }  

  fetch_Location(URL: string){
    this.http.get<any>(URL).subscribe({
      next: (data) => {
        console.log(data);
        this.responseData = data.results[0];
        this.latitude = this.responseData?.lat ?? null;
        this.longitude = this.responseData?.lon ?? null;

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
}
