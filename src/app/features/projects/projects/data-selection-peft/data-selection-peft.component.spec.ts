import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSelectionPeftComponent } from './data-selection-peft.component';

describe('DataSelectionPeftComponent', () => {
  let component: DataSelectionPeftComponent;
  let fixture: ComponentFixture<DataSelectionPeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataSelectionPeftComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataSelectionPeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
