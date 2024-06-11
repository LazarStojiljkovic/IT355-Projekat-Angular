import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmDetaljnoComponent } from './film-detaljno.component';

describe('FilmDetaljnoComponent', () => {
  let component: FilmDetaljnoComponent;
  let fixture: ComponentFixture<FilmDetaljnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilmDetaljnoComponent]
    });
    fixture = TestBed.createComponent(FilmDetaljnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
