import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StickerPackDto, StickerPackCreateModel, StickerPackUpdateModel, StickerPackImportModel } from '../models/sticker-pack.model';

@Injectable({ providedIn: 'root' })
export class StickerService {
  private apiUrl = 'https://yourapi.com/api/Sticker'; // Replace with actual API URL

  constructor(private http: HttpClient) {}

  // GET all stickers
  getAllStickers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetAll`);
  }

  // GET sticker by id
  getById(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get(`${this.apiUrl}/GetById`, { params });
  }

  // POST create sticker pack with form data
  createStickerPack(model: StickerPackCreateModel): Observable<any> {
    const formData = this.buildFormData(model);
    return this.http.post(`${this.apiUrl}/Create`, formData);
  }

  // POST update sticker pack with form data
  updateStickerPack(id: number, model: StickerPackUpdateModel): Observable<any> {
    const formData = this.buildFormData(model);
    const params = new HttpParams().set('id', id.toString());
    return this.http.post(`${this.apiUrl}/Update`, formData, { params });
  }

  // POST delete sticker by id
  deleteSticker(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.post(`${this.apiUrl}/Delete`, null, { params });
  }

  // POST import sticker packs
  importStickerPacks(dto: StickerPackImportModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/ImportSticker`, dto);
  }

  // Helper: Build form data for multipart/form-data requests
  private buildFormData(model: StickerPackCreateModel): FormData {
    const formData = new FormData();
    formData.append('Identifier', model.identifier);
    formData.append('Name', model.name);
    formData.append('Publisher', model.publisher);
    if (model.trayImageFile) {
      formData.append('TrayImageFile', model.trayImageFile);
    }
    formData.append('PublisherWebsite', model.publisherWebsite);
    formData.append('PrivacyPolicyWebsite', model.privacyPolicyWebsite);
    formData.append('LicenseAgreementWebsite', model.licenseAgreementWebsite);

    model.stickers.forEach((sticker, index) => {
      if (sticker.imageFile) {
        formData.append(`Stickers[${index}].ImageFile`, sticker.imageFile);
      }
      sticker.emojis.forEach((emoji, emojiIndex) => {
        formData.append(`Stickers[${index}].Emojis[${emojiIndex}]`, emoji);
      });
    });

    return formData;
  }
}
