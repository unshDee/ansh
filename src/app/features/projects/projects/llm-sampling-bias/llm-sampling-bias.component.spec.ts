import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlmSamplingBiasComponent } from './llm-sampling-bias.component';

describe('LlmSamplingBiasComponent', () => {
  let component: LlmSamplingBiasComponent;
  let fixture: ComponentFixture<LlmSamplingBiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlmSamplingBiasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LlmSamplingBiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
