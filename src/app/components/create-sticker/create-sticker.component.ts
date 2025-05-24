import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { StickerService } from '../../services/sticker.service';

@Component({
  selector: 'app-create-sticker',
  templateUrl: './create-sticker.component.html'
})
export class CreateStickerComponent {
  stickerForm: FormGroup;

  constructor(private fb: FormBuilder, private stickerService: StickerService) {
    this.stickerForm = this.fb.group({
      identifier: ['', Validators.required],
      name: ['', Validators.required],
      publisher: ['', Validators.required],
      trayImageFile: [null, Validators.required],
      publisherWebsite: ['', Validators.required],
      privacyPolicyWebsite: ['', Validators.required],
      licenseAgreementWebsite: ['', Validators.required],
      stickers: this.fb.array([])
    });
  }

  get stickers(): FormArray {
    return this.stickerForm.get('stickers') as FormArray;
  }

  addSticker() {
    this.stickers.push(this.fb.group({
      imageFile: [null, Validators.required],
      emojis: [[], Validators.required]
    }));
  }

  onTrayImageChange(event: any) {
    this.stickerForm.patchValue({ trayImageFile: event.target.files[0] });
  }

  onStickerImageChange(index: number, event: any) {
    this.stickers.at(index).patchValue({ imageFile: event.target.files[0] });
  }

  submit() {
    if (this.stickerForm.valid) {
      this.stickerService.createStickerPack(this.stickerForm.value).subscribe({
        next: res => alert('Sticker Pack Created Successfully!'),
        error: err => alert('Error creating sticker pack.')
      });
    } else {
      alert('Form is invalid');
    }
  }
}
