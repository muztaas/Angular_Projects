import { Routes } from '@angular/router';
import { WeatherComponent } from './components/weather/weather.component';
import { AboutComponent } from './components/about/about.component';
import { LocationComponent } from './components/location/location.component';
import { LocationWeatherComponent } from './components/location-weather/location-weather.component';

export const routes: Routes = [
  { path: '', component: LocationWeatherComponent },
  { path: 'wea', component: WeatherComponent },
  { path: 'about', component: AboutComponent },
  { path: 'loc', component: LocationComponent},
];

// for routing, changes in app.routes.ts, app.config.ts, app.component.html(for <router-outlet> tag) needed.
// href="about" or href="/about", and "about" needs to be present in app.routes.ts for links to work.
// routerLink="about" or [routerLink]="[/about]" and routerLink needs to be imported in that component.ts file.