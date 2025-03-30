import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoxartComponent } from './voxart.component';

describe('VoxartComponent', () => {
  let component: VoxartComponent;
  let fixture: ComponentFixture<VoxartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoxartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VoxartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
