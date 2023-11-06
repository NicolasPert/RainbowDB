import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppressionCharactersComponent } from './suppression-characters.component';

describe('SuppressionCharactersComponent', () => {
  let component: SuppressionCharactersComponent;
  let fixture: ComponentFixture<SuppressionCharactersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuppressionCharactersComponent]
    });
    fixture = TestBed.createComponent(SuppressionCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
