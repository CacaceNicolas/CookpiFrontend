import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Servicio } from '../servicio';

@Component({
  selector: 'app-signup',
  imports: [

    ReactiveFormsModule

  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  constructor (private apiservice: Servicio) {}

  mail = new FormControl('');
  password = new FormControl('');
  nombre = new FormControl('');

  async botonCrearUsuario() {
    if (this.mail.value && this.password.value && this.nombre.value) {
      try {
        
        const response = await this.apiservice.crearUsuario(this.nombre.value, this.password.value, this.mail.value);

      } catch (error) {
        console.error('Error al crear el usuario:', error);
      }
    } else {
      console.error('Por favor, complete todos los campos.');
    }
  }






}
