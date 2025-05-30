import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickerListComponent } from './sticker-list.component';

describe('StickerListComponent', () => {
  let component: StickerListComponent;
  let fixture: ComponentFixture<StickerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StickerListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
