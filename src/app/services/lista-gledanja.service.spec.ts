import { TestBed } from '@angular/core/testing';

import { ListaGledanjaFilmService } from './lista-gledanja.service';

describe('ListaGledanjaService', () => {
  let service: ListaGledanjaFilmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaGledanjaFilmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
