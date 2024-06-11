import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFilmComponent } from './admin-film.component';

describe('AdminFilmComponent', () => {
  let component: AdminFilmComponent;
  let fixture: ComponentFixture<AdminFilmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFilmComponent]
    });
    fixture = TestBed.createComponent(AdminFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
