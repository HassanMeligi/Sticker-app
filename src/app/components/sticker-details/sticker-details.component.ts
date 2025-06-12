import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StickerService } from '../../services/sticker.service';

@Component({
  selector: 'app-sticker-details',
  templateUrl: './sticker-details.component.html',
  styleUrls: ['./sticker-details.component.scss']
})
export class StickerDetailsComponent implements OnInit {
  stickerPack: any = null;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private stickerService: StickerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadStickerPack();
  }

  loadStickerPack() {
    this.stickerService.getStickerById(this.id).subscribe({
      next: (response) => {
        this.stickerPack = response.value;
      },
      error: (err) => {
        console.error('Failed to load sticker pack', err);
        alert('Error loading sticker pack details.');
      }
    });
  }

  updateStickerPack() {
    const formData = this.stickerService.buildFormData(this.stickerPack);  // Assuming the model has the updated data
    this.stickerService.updateStickerPack(this.id, formData).subscribe({
      next: () => {
        alert('Sticker pack updated successfully!');
        this.loadStickerPack();  // Reload details
      },
      error: (err) => {
        console.error('Update failed', err);
        alert('Failed to update sticker pack.');
      }
    });
  }

  deleteStickerPack() {
    if (confirm('Are you sure you want to delete this sticker pack?')) {
      this.stickerService.deleteStickerPack(this.id).subscribe({
        next: () => {
          alert('Sticker pack deleted successfully!');
          this.router.navigate(['/']);  // Navigate back to list
        },
        error: (err) => {
          console.error('Delete failed', err);
          alert('Failed to delete sticker pack.');
        }
      });
    }
  }
}
