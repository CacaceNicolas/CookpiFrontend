import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Servicio } from '../servicio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-libro',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './crear-libro.html',
  styleUrl: './crear-libro.css'
})

export class CrearLibro {

  nombre = new FormControl("");
  descripcion = new FormControl("");
  id : number = 0;

  constructor(private apiservice: Servicio, private router: Router) {}

  async crearLibro() : Promise<void>{
    if (this.nombre.value != ""){
      this.id = (  await this.apiservice.agregarLibro(this.nombre.value!, this.descripcion.value!)).data;
      this.router.navigate(['/libro/' + this.id]);
    }
    else{
      window.alert("El nombre no puede estar vacio");
    }
  }
  
}
