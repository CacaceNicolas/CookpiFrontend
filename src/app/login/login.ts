import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Servicio } from '../servicio';



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

  constructor(private apiservice: Servicio) {}

  async botonIniciarSesion() {

    if (this.nombre.value && this.password.value) {
      try {
        console.log("ASDASD")
        const response = await this.apiservice.iniciarSesion(this.nombre.value, this.password.value);
        localStorage.setItem("jwt", response)
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    } else {
      console.error('Por favor, complete todos los campos.');
    }
  }

}
