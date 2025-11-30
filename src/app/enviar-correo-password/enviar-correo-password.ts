import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Servicio } from '../servicio';


@Component({
  selector: 'app-enviar-correo-password',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './enviar-correo-password.html',
  styleUrl: './enviar-correo-password.css'
})
export class EnviarCorreoPassword {
  mail = new FormControl('');
  
  constructor(private apiservice: Servicio) {}
  
  async botonEnviarCorreoPassword() {

    if (this.mail.value) {
    console.log(this.mail.value);
    try { 
      let resp = await this.apiservice.enviarCorreoPassword(this.mail.value);
      window.alert('Correo enviado correctamente');
    } catch (error: any) {
      window.alert(error.response.data);
    }
    } else {
      window.alert('Por favor ingrese un correo');
      return;
    }
  }
}
