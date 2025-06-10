import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Servicio } from '../servicio';

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

  constructor(private route: ActivatedRoute, private apiservice: Servicio) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token')!;
  }
  

  botonCambiarPassword() {

    if (this.password.value) {
      this.apiservice.cambiarPassword(this.token, this.password.value)
        .then(response => {
          console.log('Contraseña cambiada exitosamente:', response);
        })
        .catch(error => {
          console.error('Error al cambiar la contraseña:', error);
        });
    } 


  }





}
