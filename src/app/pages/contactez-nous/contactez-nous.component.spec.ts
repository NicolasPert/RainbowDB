import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactezNousComponent } from './contactez-nous.component';

describe('ContactezNousComponent', () => {
  let component: ContactezNousComponent;
  let fixture: ComponentFixture<ContactezNousComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactezNousComponent]
    });
    fixture = TestBed.createComponent(ContactezNousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
