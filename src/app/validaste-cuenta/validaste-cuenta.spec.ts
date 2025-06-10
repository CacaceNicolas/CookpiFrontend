import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidasteCuenta } from './validaste-cuenta';

describe('ValidasteCuenta', () => {
  let component: ValidasteCuenta;
  let fixture: ComponentFixture<ValidasteCuenta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidasteCuenta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidasteCuenta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
