import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeepComponent } from './deep.component';

describe('DeepComponent', () => {
  let component: DeepComponent;
  let fixture: ComponentFixture<DeepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
