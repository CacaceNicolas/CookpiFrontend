import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarCorreoPassword } from './enviar-correo-password';

describe('EnviarCorreoPassword', () => {
  let component: EnviarCorreoPassword;
  let fixture: ComponentFixture<EnviarCorreoPassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnviarCorreoPassword]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviarCorreoPassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
