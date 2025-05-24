import { Component, OnInit } from '@angular/core';
import { StickerService } from '../../services/sticker.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sticker-list',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    MatCardModule, MatIconModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule,
    MatSnackBarModule
  ],
  templateUrl: './sticker-list.component.html',
  styleUrls: ['./sticker-list.component.scss']
})
export class StickerListComponent implements OnInit {
  stickerPacks: any[] = [];
  filteredPacks: any[] = [];
  searchQuery: string = '';
  sortOption: string = 'name-asc';

  constructor(
    private stickerService: StickerService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.stickerService.getAllStickers().subscribe({
      next: (res) => {
        console.log('Sticker packs:', res);
        this.stickerPacks = res.data.map((pack: any) => ({
          ...pack,
          trayImageUrl:  pack.trayImageFile,  // Adjust if needed
          stickersCount: pack.stickers.length,
          createdAt: new Date(),  // If your API includes a date, replace this with the actual date
          downloadCount: 0        // Optional: if your API includes download count
        }));
        this.filteredPacks = [...this.stickerPacks];
      },
      error: (err) => {
        console.error('Failed to load sticker packs', err);
        this.snackBar.open('Error loading sticker packs', 'Close', { duration: 3000 });
      }
    });
  }

  applyFilter() {
    let packs = [...this.stickerPacks];

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      packs = packs.filter(pack =>
        pack.name.toLowerCase().includes(query) ||
        pack.publisher.toLowerCase().includes(query)
      );
    }

    switch (this.sortOption) {
      case 'name-asc':
        packs.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        packs.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'date-newest':
        packs.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case 'date-oldest':
        packs.sort((a, b) => a.createdAt - b.createdAt);
        break;
    }

    this.filteredPacks = packs;
  }

  createNewPack() {
    this.router.navigate(['/create']);
  }

  editStickerPack(id: number) {
    this.router.navigate(['/create', id]);
  }

  sharePack(pack: any) {
    this.snackBar.open(`Sharing pack: ${pack.name}`, 'Close', { duration: 2000 });
  }
confirmDelete(pack: any) {
  if (confirm(`Are you sure you want to delete "${pack.name}"?`)) {
    this.stickerService.deleteStickerPack(pack.id).subscribe({
      next: () => {
        this.snackBar.open('Sticker pack deleted!', 'Close', { duration: 3000 });
        this.stickerPacks = this.stickerPacks.filter(p => p.id !== pack.id);
        this.ngOnInit();
      },
      error: () => {
        this.snackBar.open('Error deleting sticker pack', 'Close', { duration: 3000 });
      }
    });
  }
}


  
}
