import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramRepairHintComponent } from './program-repair-hint.component';

describe('ProgramRepairHintComponent', () => {
  let component: ProgramRepairHintComponent;
  let fixture: ComponentFixture<ProgramRepairHintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramRepairHintComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgramRepairHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
