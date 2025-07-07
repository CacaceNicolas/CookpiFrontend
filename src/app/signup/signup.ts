import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Servicio } from '../servicio';
import { Axios } from 'axios';
import axios, { AxiosError } from 'axios';

@Component({
  selector: 'app-signup',
  imports: [

    ReactiveFormsModule,
    CommonModule

  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {

  mensajeNotificacion: string = '';
  mostrarNotificacion: boolean = false;
  tipoNotificacion: 'success' | 'error' = 'success';


  constructor (private apiservice: Servicio) {}

  mail = new FormControl('');
  password = new FormControl('');
  nombre = new FormControl('');

  mostrarMensaje(mensaje: string, tipo: 'success' | 'error' = 'success') {
    this.mensajeNotificacion = mensaje;
    this.mostrarNotificacion = true;
    this.tipoNotificacion = tipo;
    setTimeout(() => {
      this.mostrarNotificacion = false;
      this.mensajeNotificacion = '';
    }, 3000);
  }

  async botonCrearUsuario() {
    if (this.mail.value && this.password.value && this.nombre.value) {
      try {
        
        const response = await this.apiservice.crearUsuario(this.nombre.value, this.password.value, this.mail.value);
        this.mostrarMensaje('Usuario creado exitosamente :D!','success');
      } catch (error: unknown) {
        if(axios.isAxiosError(error)){
        this.mostrarMensaje('Error al crear el usuario:' + error.response?.data,'error' );
      }
      }
    } else {

      this.mostrarMensaje('Por favor, complete todos los campos.', 'error');

    }
  }






}
