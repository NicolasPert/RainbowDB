import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcEnCielComponent } from './arc-en-ciel.component';

describe('ArcEnCielComponent', () => {
  let component: ArcEnCielComponent;
  let fixture: ComponentFixture<ArcEnCielComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArcEnCielComponent]
    });
    fixture = TestBed.createComponent(ArcEnCielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
