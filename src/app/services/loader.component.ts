import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from './loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loader-overlay" *ngIf="loading$ | async">
      <div class="spinner"></div>
    </div>
  `,
  styleUrls: ['./loader.component.scss']  // Also ensure this is present
})
export class LoaderComponent implements OnInit {
  loading$!: Observable<boolean>;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loading$ = this.loadingService.loading$;
  }
}

