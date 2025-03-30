import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactCheckLiarComponent } from './fact-check-liar.component';

describe('FactCheckLiarComponent', () => {
  let component: FactCheckLiarComponent;
  let fixture: ComponentFixture<FactCheckLiarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactCheckLiarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FactCheckLiarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
