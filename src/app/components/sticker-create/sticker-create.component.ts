import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StickerService } from '../../services/sticker.service';
import { provideHttpClient } from '@angular/common/http';  // 👈 Add this import

@Component({
  selector: 'app-sticker-create',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatCardModule,
    MatButtonModule, MatIconModule, MatExpansionModule,
  ],
  templateUrl: './sticker-create.component.html',
  styleUrls: ['./sticker-create.component.scss']
})
export class StickerCreateComponent {
  stickerForm: FormGroup;
  trayImagePreview: string | null = null;
  stickerImagePreviews: (string | null)[] = [];

  constructor(private fb: FormBuilder, private stickerService: StickerService, private snackBar: MatSnackBar) {
    this.stickerForm = this.fb.group({
      identifier: ['', Validators.required],
      name: ['', Validators.required],
      publisher: ['', Validators.required],
      trayImageFile: [null, Validators.required],
      publisherWebsite: [''],
      privacyPolicyWebsite: [''],
      licenseAgreementWebsite: [''],
      stickers: this.fb.array([])
    });
  }

  get stickers(): FormArray {
    return this.stickerForm.get('stickers') as FormArray;
  }

  addSticker() {
    this.stickers.push(this.fb.group({ imageFile: [null, Validators.required], emojis: ['', Validators.required] }));
    this.stickerImagePreviews.push(null);
  }

  onTrayImageChange(e: any) {
    const file = e.target.files[0];
    if (file) {
      this.stickerForm.patchValue({ trayImageFile: file });
      const reader = new FileReader();
      reader.onload = () => this.trayImagePreview = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  onStickerImageChange(i: number, e: any) {
    const file = e.target.files[0];
    if (file) {
      this.stickers.at(i).patchValue({ imageFile: file });
      const reader = new FileReader();
      reader.onload = () => this.stickerImagePreviews[i] = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  removeTrayImage() {
    this.trayImagePreview = null;
    this.stickerForm.patchValue({ trayImageFile: null });
  }

  removeSticker(index: number) {
    this.stickers.removeAt(index);
    this.stickerImagePreviews.splice(index, 1);
  }

  removeStickerImage(index: number) {
    this.stickerImagePreviews[index] = null;
    this.stickers.at(index).patchValue({ imageFile: null });
  }

  submit() {
    if (this.stickerForm.valid) {
      const value = this.stickerForm.value;
      value.stickers = value.stickers.map((s: any) => ({
        ...s,
        emojis: s.emojis.split(',').map((e: string) => e.trim())
      }));
      const formData = this.stickerService.buildFormData(value);
      this.stickerService.createStickerPack(formData).subscribe({
        next: () => this.snackBar.open('Created!', 'Close', { duration: 3000 }),
        error: () => this.snackBar.open('Error!', 'Close', { duration: 3000 })
      });
    } else {
      this.snackBar.open('Invalid form', 'Close', { duration: 3000 });
    }
  }

  cancel() {
    this.stickerForm.reset();
    this.trayImagePreview = null;
    this.stickerImagePreviews = [];
  }
}
