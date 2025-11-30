import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Servicio } from '../servicio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-password',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './recuperar-password.html',
  styleUrl: './recuperar-password.css'
})



export class RecuperarPassword {
  password = new FormControl('');
  token: string = '';
  constructor(private route: ActivatedRoute, private apiservice: Servicio, private router: Router) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token')!;
  }
  

  async botonCambiarPassword() {

    if (this.password.value) {
      try { 
      await this.apiservice.cambiarPassword(this.token, this.password.value)
      window.alert('Contraseña cambiada exitosamente');
      this.router.navigate(['/login']);
    } catch (error: any) {
        window.alert('Error al cambiar la contraseña: ' + error.response.data);
      }
    } 
    else {
      window.alert('Por favor ingrese una nueva contraseña');
      return;
    }
  }
}
