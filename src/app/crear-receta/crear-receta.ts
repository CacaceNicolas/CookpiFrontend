import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Servicio } from '../servicio';

@Component({
  selector: 'app-crear-receta',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-receta.html',
  styleUrl: './crear-receta.css'
})
export class CrearReceta {

  nombre = new FormControl("");
  descripcion = new FormControl("");
  procedimiento = new FormControl("")


  constructor(private apiservice: Servicio) {}

  items : any [] = []

    ngOnInit(){
    this.actualizarLista()
    }

    async actualizarLista() {
    const itemsAnterior = this.items;
    this.items = await this.apiservice.getIngredientesTodos();
  }

  cantIngredientes : number = 2;

  counter(length: number): number[] {
    return Array.from({ length }, (_, i) => i);
  }

  incrementarIngredientes(): void {
  this.cantIngredientes++;
  }

  
  reducirIngredientes(): void {
  if (this.cantIngredientes > 1){
    this.cantIngredientes--;
  }
  }


}
