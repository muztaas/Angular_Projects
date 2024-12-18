import { Component,  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FetchDataService } from '../../services/fetch-data.service';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {

  text: string = 'Get position';
  input_city: string = '';
  errorMsg: string|any = null;

  hidden: boolean = true;
  latitude: string = '';
  longitude: string = '';

  constructor(private fetchData : FetchDataService) {}

  getPosition()
  {
    this.hidden = false;
    /* let response = this.fetchData.fetchData(this.input_city);
    this.longitude = response.toString(); */
    this.fetchData.fetchData(this.input_city).subscribe(
      (data: any) => {
        console.log(data);

        if(data)
        {
          let location = data.results[0];
          this.latitude = location.lat;
          this.longitude = location.lon;
        }
      }
    )
  }

}
