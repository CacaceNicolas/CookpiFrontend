import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Servicio } from '../servicio';

@Component({
  selector: 'app-crear-receta',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './crear-receta.html',
  styleUrl: './crear-receta.css'
})
export class CrearReceta {

  nombre = new FormControl("");
  descripcion = new FormControl("");
  procedimiento = new FormControl("");
  momentoDelDia = new FormControl("");
  dieta = new FormControl("");
  tiempo = new FormControl(0);

  cantIngredientes : number = 2
  ingredientesSeleccionados: { codigo: string, cantidad: number }[] = Array(this.cantIngredientes).fill(null).map(() => ({
  codigo: '',
  cantidad: 0
}));


  constructor(private apiservice: Servicio) {}


  items : any [] = []

    ngOnInit(){
    this.actualizarLista()
    }

  async actualizarLista() {
    const itemsAnterior = this.items;
    this.items = await this.apiservice.getIngredientesTodos();
    
  }

  counter(length: number): number[] {
    return Array.from({ length }, (_, i) => i);
  }

  incrementarIngredientes(): void {
  this.cantIngredientes++;
  this.ingredientesSeleccionados.push({codigo:"", cantidad: 0});
}

reducirIngredientes(): void {
  if (this.cantIngredientes > 1) {
    this.cantIngredientes--;
    this.ingredientesSeleccionados.pop();
  }
}

mostrarIngredientes(): void{

  if(this.momentoDelDia.value != null &&this.nombre.value != null && this.descripcion.value != null && this.procedimiento.value != null && this.ingredientesSeleccionados != null && this.ingredientesSeleccionados[0].codigo != "" && this.tiempo.value != null && this.tiempo.value > 0 && this.dieta.value != null){

    console.log(this.ingredientesSeleccionados)

  this.apiservice.agregarReceta(
    this.nombre.value,
    this.descripcion.value,
    this.procedimiento.value,
    this.momentoDelDia.value,
    this.ingredientesSeleccionados,
    this.tiempo.value,
    this.dieta.value
  
  )
}
}

}
