export interface StickerDto {
  imageFile: string;
  emojis: string[];
}

export interface StickerPackDto {
  identifier: string;
  name: string;
  publisher: string;
  trayImageFile: string;
  publisherWebsite: string;
  privacyPolicyWebsite: string;
  licenseAgreementWebsite: string;
  stickers: StickerDto[];
}

export interface StickerCreateModel {
  imageFile: File | null;
  emojis: string[];
}

export interface StickerPackCreateModel {
  identifier: string;
  name: string;
  publisher: string;
  trayImageFile: File | null;
  publisherWebsite: string;
  privacyPolicyWebsite: string;
  licenseAgreementWebsite: string;
  stickers: StickerCreateModel[];
}

export interface StickerPackUpdateModel extends StickerPackCreateModel {
}

export interface StickerPackImportModel {
  // Define fields as needed
}
