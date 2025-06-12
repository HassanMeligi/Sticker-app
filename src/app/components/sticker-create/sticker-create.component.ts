import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { StickerService } from '../../services/sticker.service';

@Component({
  selector: 'app-sticker-create',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatCardModule,
    MatButtonModule, MatIconModule, MatExpansionModule
  ],
  templateUrl: './sticker-create.component.html',
  styleUrls: ['./sticker-create.component.scss']
})
export class StickerCreateComponent implements OnInit {
  stickerForm: FormGroup;
  trayImagePreview: string | null = null;
  stickerImagePreviews: (string | null)[] = [];
  isUpdateMode = false;
  stickerId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private stickerService: StickerService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.stickerForm = this.fb.group({
      identifier: ['', Validators.required],
      name: ['', Validators.required],
      publisher: ['', Validators.required],
      trayImageFile: [null],
      trayImagePath: [''],
      publisherWebsite: [''],
      privacyPolicyWebsite: [''],
      licenseAgreementWebsite: [''],
      stickers: this.fb.array([])
    });
  }

  get stickers(): FormArray {
    return this.stickerForm.get('stickers') as FormArray;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isUpdateMode = true;
        this.stickerId = +id;
        this.loadStickerData(this.stickerId);
      }
    });
  }

  loadStickerData(id: number) {
    this.stickerService.getStickerById(id).subscribe({
      next: (res) => {
        const data = res.data;
        this.stickerForm.patchValue({
          identifier: data.identifier,
          name: data.name,
          publisher: data.publisher,
          trayImageFile: null,
          trayImagePath: data.trayImageFile,
          publisherWebsite: data.publisherWebsite,
          privacyPolicyWebsite: data.privacyPolicyWebsite,
          licenseAgreementWebsite: data.licenseAgreementWebsite
        });

        this.trayImagePreview = data.trayImageFile;
        this.stickerImagePreviews = [];

        data.stickers.forEach((sticker: any) => {
          this.stickers.push(this.fb.group({
  id: [sticker.id],
  imageFile: null,
  emojis: sticker.emojis.join(',')
}));

          
          this.stickerImagePreviews.push(sticker.imageFile);
        });
      },
      error: () => {
        this.snackBar.open('Failed to load sticker data', 'Close', { duration: 3000 });
      }
    });
  }

  addSticker() {
    this.stickers.push(this.fb.group({
      imageFile: [null, Validators.required],
      imagePath: [''],
      emojis: ['', Validators.required]
    }));
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
    this.stickerForm.patchValue({ trayImageFile: null, trayImagePath: '' });
  }

  removeSticker(index: number) {
    this.stickers.removeAt(index);
    this.stickerImagePreviews.splice(index, 1);
  }

  removeStickerImage(index: number) {
    this.stickerImagePreviews[index] = null;
    this.stickers.at(index).patchValue({ imageFile: null, imagePath: '' });
  }

  submit() {
    if (this.stickerForm.valid) {
      const value = this.stickerForm.value;
      value.stickers = value.stickers.map((s: any) => ({
        ...s,
        emojis: s.emojis.split(',').map((e: string) => e.trim())
      }));

      const formData = this.stickerService.buildFormData(value);

      if (this.isUpdateMode && this.stickerId) {
        this.stickerService.updateStickerPack(this.stickerId, formData).subscribe({
          next: () => this.snackBar.open('Sticker pack updated!', 'Close', { duration: 3000 }),
          error: () => this.snackBar.open('Error updating pack', 'Close', { duration: 3000 })
        });
      } else {
        this.stickerService.createStickerPack(formData).subscribe({
          next: () => this.snackBar.open('Sticker pack created!', 'Close', { duration: 3000 }),
          error: () => this.snackBar.open('Error creating pack', 'Close', { duration: 3000 })
        });
      }
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
