import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Servicio } from '../servicio';

@Component({
  selector: 'app-valide-su-cuenta',
  imports: [],
  templateUrl: './valide-su-cuenta.html',
  styleUrl: './valide-su-cuenta.css'
})
export class ValideSuCuenta {

  constructor(private router: Router, private apiservice: Servicio) {}

  cerrarSesion(){
    localStorage.removeItem("jwt");
    this.router.navigate(['/']);
  }

  reenviarCorreo(){ 
    try {
    this.apiservice.reenviarCorreoVerificacion();
    window.alert('Correo de verificación reenviado');
    } catch (error: any) {
      window.alert('Error al reenviar el correo de verificación: ' + error.response.data);
      return;
    }
  }
    irAPaginaPrincipal(){
    this.router.navigate(['/']);
  }
}
