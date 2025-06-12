import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './services/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,  // ✅ Enable standalone
  imports: [RouterOutlet,LoaderComponent],  // ✅ Import RouterOutlet
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { }