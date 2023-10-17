import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterComponent } from './ajouter-characters.component';

describe('AjouterComponent', () => {
  let component: AjouterComponent;
  let fixture: ComponentFixture<AjouterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterComponent],
    });
    fixture = TestBed.createComponent(AjouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});