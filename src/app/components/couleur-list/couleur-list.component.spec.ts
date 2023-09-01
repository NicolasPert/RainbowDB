import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouleurListComponent } from './couleur-list.component';

describe('CouleurListComponent', () => {
  let component: CouleurListComponent;
  let fixture: ComponentFixture<CouleurListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CouleurListComponent]
    });
    fixture = TestBed.createComponent(CouleurListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
