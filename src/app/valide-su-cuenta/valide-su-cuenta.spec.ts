import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValideSuCuenta } from './valide-su-cuenta';

describe('ValideSuCuenta', () => {
  let component: ValideSuCuenta;
  let fixture: ComponentFixture<ValideSuCuenta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValideSuCuenta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValideSuCuenta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
