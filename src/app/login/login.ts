import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Servicio } from '../servicio';
import { CommonModule } from '@angular/common';
import axios, { AxiosError } from 'axios';



@Component({

  selector: 'app-login',

  imports: [

    ReactiveFormsModule,
    CommonModule
    
  ],
  templateUrl: './login.html',

  styleUrl: './login.css'

})
export class Login {

  nombre = new FormControl('');
  password = new FormControl('');

  mensajeNotificacion: string = '';
  mostrarNotificacion: boolean = false;
  tipoNotificacion: 'success' | 'error' = 'success';


  constructor(private apiservice: Servicio) {}

  mostrarMensaje(mensaje: string, tipo:'success' | 'error' = 'success') {

    this.mensajeNotificacion = mensaje;
    this.mostrarNotificacion = true;
    this.tipoNotificacion = tipo;

    setTimeout(() => {

      this.mostrarNotificacion = false;
      this.mensajeNotificacion = '';

    }, 3000);
  }

  async botonIniciarSesion() {
    if (this.nombre.value && this.password.value) {

      try {
        
        const response = await this.apiservice.iniciarSesion(this.nombre.value, this.password.value);
        
        console.log(response)        
        
        localStorage.setItem("jwt", response)
        
        this.mostrarMensaje('Se inició la sesión', 'success');

        

      } catch (error: unknown) {
        
        if(axios.isAxiosError(error)){
        
          this.mostrarMensaje('Error al iniciar sesión: ' + error.response?.data, 'error');
        }
        

      }
    } else {

      this.mostrarMensaje('Por favor, complete todos los campos.','error');

    }
  }

}
