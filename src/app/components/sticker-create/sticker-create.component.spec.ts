import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickerCreateComponent } from './sticker-create.component';

describe('StickerCreateComponent', () => {
  let component: StickerCreateComponent;
  let fixture: ComponentFixture<StickerCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StickerCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
