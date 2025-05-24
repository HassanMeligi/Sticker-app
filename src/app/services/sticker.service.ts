import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StickerService {
  private apiUrl = 'http://localhost:5286/api/Sticker';  // ✅ Use http for local dev

  constructor(private http: HttpClient) {}

  getAllStickers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetAll`);
  }

  getStickerById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetById`, { params: new HttpParams().set('id', id) });
  }

  createStickerPack(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/Create`, formData);
  }

  updateStickerPack(id: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/Update`, formData, { params: new HttpParams().set('id', id.toString()) });
  }

  deleteStickerPack(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/Delete`, null, { params: new HttpParams().set('id', id.toString()) });
  }

  buildFormData(model: any): FormData {
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
    model.stickers.forEach((sticker: any, i: number) => {
      if (sticker.imageFile) {
        formData.append(`Stickers[${i}].ImageFile`, sticker.imageFile);
      }
      const emojisArray = typeof sticker.emojis === 'string' ? sticker.emojis.split(',').map((e: string) => e.trim()) : sticker.emojis;
      emojisArray.forEach((emoji: string, j: number) => {
        formData.append(`Stickers[${i}].Emojis[${j}]`, emoji);
      });
    });
    return formData;
  }
}
