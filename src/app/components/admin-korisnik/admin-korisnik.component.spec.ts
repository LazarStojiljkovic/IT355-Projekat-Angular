import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKorisnikComponent } from './admin-korisnik.component';

describe('AdminKorisnikComponent', () => {
  let component: AdminKorisnikComponent;
  let fixture: ComponentFixture<AdminKorisnikComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminKorisnikComponent]
    });
    fixture = TestBed.createComponent(AdminKorisnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
