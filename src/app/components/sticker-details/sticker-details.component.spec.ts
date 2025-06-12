import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickerDetailsComponent } from './sticker-details.component';

describe('StickerDetailsComponent', () => {
  let component: StickerDetailsComponent;
  let fixture: ComponentFixture<StickerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StickerDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
