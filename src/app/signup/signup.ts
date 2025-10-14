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
  peso =new FormControl(0);
  altura = new FormControl(0);
  objetivo = new FormControl(0);
  edad = new FormControl(0);
  genero = new FormControl(0);


  async botonCrearUsuario() {
    if (this.mail.value && this.password.value && this.nombre.value && this.altura.value && this.peso.value && this.objetivo.value && this.edad.value && this.genero.value) {
      try {
        
        const response = await this.apiservice.crearUsuario(this.nombre.value, this.password.value, this.mail.value,this.altura.value, this.peso.value, this.objetivo.value, this.edad.value, this.genero.value
        );
        console.log('Usuario creado exitosamente:', response);
      } catch (error) {
        console.error('Error al crear el usuario:', error);
      }
    } else {
      console.error('Por favor, complete todos los campos.');
    }
  }


}