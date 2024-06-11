import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGlumacComponent } from './admin-glumac.component';

describe('AdminGlumacComponent', () => {
  let component: AdminGlumacComponent;
  let fixture: ComponentFixture<AdminGlumacComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminGlumacComponent]
    });
    fixture = TestBed.createComponent(AdminGlumacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
