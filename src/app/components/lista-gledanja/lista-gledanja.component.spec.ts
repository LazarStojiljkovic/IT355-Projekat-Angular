import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGledanjaComponent } from './lista-gledanja.component';

describe('ListaGledanjaComponent', () => {
  let component: ListaGledanjaComponent;
  let fixture: ComponentFixture<ListaGledanjaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaGledanjaComponent]
    });
    fixture = TestBed.createComponent(ListaGledanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
