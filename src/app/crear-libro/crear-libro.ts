import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Servicio } from '../servicio';


@Component({
  selector: 'app-crear-libro',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './crear-libro.html',
  styleUrl: './crear-libro.css'
})
export class CrearLibro {

  nombre = new FormControl("");
  descripcion = new FormControl("");

  constructor(private apiservice: Servicio) {}

  crearLibro() : void{
    this.apiservice.agregarLibro(this.nombre.value ?? "", this.descripcion.value ?? "")
  }
  mostrarLibros(): void{

  if (this.nombre.value != null && this.descripcion.value !=null){
    this.apiservice.agregarLibro(
    this.nombre.value,
    this.descripcion.value
  )
}
}

}
