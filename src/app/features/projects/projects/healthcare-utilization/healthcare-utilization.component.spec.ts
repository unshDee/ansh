import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcareUtilizationComponent } from './healthcare-utilization.component';

describe('HealthcareUtilizationComponent', () => {
  let component: HealthcareUtilizationComponent;
  let fixture: ComponentFixture<HealthcareUtilizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthcareUtilizationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HealthcareUtilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
