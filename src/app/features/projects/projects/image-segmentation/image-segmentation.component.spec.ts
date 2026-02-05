import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSegmentationComponent } from './image-segmentation.component';

describe('ImageSegmentationComponent', () => {
  let component: ImageSegmentationComponent;
  let fixture: ComponentFixture<ImageSegmentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageSegmentationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageSegmentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
