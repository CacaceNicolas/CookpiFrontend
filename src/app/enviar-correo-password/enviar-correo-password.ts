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
  
  botonEnviarCorreoPassword() {

    if (this.mail.value) {
      this.apiservice.enviarCorreoPassword(this.mail.value)
        .then(response => {
          console.log('Contraseña cambiada exitosamente:', response);
        })
        .catch(error => {
          console.error('Error al cambiar la contraseña:', error);
        });
    } 


  }



}
