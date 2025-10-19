import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearLibro } from './crear-libro';

describe('CrearLibro', () => {
  let component: CrearLibro;
  let fixture: ComponentFixture<CrearLibro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearLibro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearLibro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
