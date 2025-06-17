import { Component } from '@angular/core';
import { Servicio } from '../servicio';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ingredientes',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ingredientes.html',
  styleUrl: './ingredientes.css'
})



export class Ingredientes {

  nombre = new FormControl('');
  calorias = new FormControl(0);
  proteinas = new FormControl(0);
  grasas = new FormControl(0); 
  carbohidratos = new FormControl(0);

  busqueda : string = "";
  pagina : number = 0;

  constructor(private apiservice: Servicio) {}

  items : any[] = []

  ngOnInit(){
    this.actualizarLista()
  }
  
  async restarPagina(){
    if (this.pagina > 0){
      this.pagina -= 1
    }
    this.actualizarLista()
  }

  async sumarPagina(){
   
    this.pagina += 1
    


    this.actualizarLista()
  }


  async actualizarLista() {
    console.log(this.pagina)
    const itemsAnterior = this.items;
    this.items = await this.apiservice.getIngredientes(this.pagina, this.busqueda);
    if (this.items.length == 0 && this.pagina > 0){
      this.items = itemsAnterior
      this.pagina -= 1
    }



  }

  async eliminarItem(id: string) {
    this.apiservice.eliminarIngrediente(id)
    this.actualizarLista()
  }

  async modItem(id:string, value :any){
    if(this.nombre.value){

      this.apiservice.modIngrediente(id, value, this.nombre.value);
    }
    
    await this.actualizarLista();
  }


  async botonCrearIngrediente() {
    
    if (this.nombre.value && this.calorias.value && this.proteinas.value && this.grasas.value && this.carbohidratos.value) {
      try {
        this.apiservice.agregarIngrediente(

          this.nombre.value,
          this.calorias.value,
          this.proteinas.value,
          this.grasas.value,
          this.carbohidratos.value
        );
        await this.actualizarLista();
      } catch (error) {
        console.error('Error al crear el ingrediente:', error);
      }
    } else {
      console.error('Por favor, complete todos los campos.');
    }
  
  
  }



  buscar(cadena : string){
    this.busqueda = cadena
    this.actualizarLista()
  }


}
