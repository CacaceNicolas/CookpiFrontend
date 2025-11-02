import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Servicio } from '../servicio';
import { AxiosError } from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [

    ReactiveFormsModule

  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  constructor (private apiservice: Servicio, private router: Router) {}

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
        if(this.edad.value < 16){ throw new AxiosError('La edad mínima para registrarse es 16 años'); }
        if(this.peso.value < 30){ throw new AxiosError('El peso mínimo para registrarse es 30 kg'); }
        if(this.altura.value < 100){ throw new AxiosError('La altura mínima para registrarse es 100 cm'); }
        if(this.edad.value > 100){ throw new AxiosError('La edad máxima para registrarse es 100 años'); }
        if(this.peso.value > 500){ throw new AxiosError('El peso máximo para registrarse es 500 kg'); }
        if(this.altura.value > 230){ throw new AxiosError('La altura máxima para registrarse es 230 cm'); }

        const response = await this.apiservice.crearUsuario(this.nombre.value, this.password.value, this.mail.value,this.altura.value, this.peso.value, this.objetivo.value, this.edad.value, this.genero.value);
        console.log('Usuario creado exitosamente:', response);
        this.router.navigate(['/']);
      } catch (error) {
        if (error instanceof AxiosError) {
          if(error.response && error.response.data) {
          console.error('Error al crear el usuario:', error.response.data);
          window.alert('Error al crear el usuario: ' + error.response.data);
        } else if (error.message){
          console.error('Error al crear el usuario:', error.message);
          window.alert('Error al crear el usuario: ' + error.message);
        }
      }
      }
    } else {
      console.error('Por favor, complete todos los campos.');
      window.alert('Por favor, complete todos los campos.'); 
    }
  }


}