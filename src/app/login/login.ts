import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Servicio } from '../servicio';
import { AxiosError } from 'axios';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [

    ReactiveFormsModule

  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  nombre = new FormControl('');
  password = new FormControl('');

  constructor(private apiservice: Servicio, private router: Router) {}

  async botonIniciarSesion() {

    if (this.nombre.value && this.password.value) {
      try {
        const response = await this.apiservice.iniciarSesion(this.nombre.value, this.password.value);
        localStorage.setItem("jwt", response)
        this.router.navigate(['/']);

      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          console.error('Error al iniciar sesión:', error.response.data);
          window.alert('Error al iniciar sesión: ' + error.response.data);
        }}
    } else {
      console.error('Por favor, complete todos los campos.');
      window.alert('Por favor, complete todos los campos.');
    }
  }
  
  irAPaginaPrincipal(){
    this.router.navigate(['/']);
  }


}
