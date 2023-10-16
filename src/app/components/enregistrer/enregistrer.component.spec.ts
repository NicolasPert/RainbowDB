import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregistrerComponent } from './enregistrer.component';

describe('EnregistrerComponent', () => {
  let component: EnregistrerComponent;
  let fixture: ComponentFixture<EnregistrerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnregistrerComponent]
    });
    fixture = TestBed.createComponent(EnregistrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
