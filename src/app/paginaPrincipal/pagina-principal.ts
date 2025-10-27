import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Servicio } from '../servicio';
import { Route } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pagina-principal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagina-principal.html',
  styleUrl: './pagina-principal.css'
})
export class PaginaPrincipalComponent {
  
  
  recetas: any[] = [];
  recetaDestacada: any;
  pagina = 0;
  busqueda = "";
  filtro : string = "";

  constructor(private servicio: Servicio, @Inject(Router) private router : Router) {}

  async ngOnInit() {
    try {
      this.actualizarLista()
    } catch (error) {
      console.error('Error cargando las recetas', error);
    }
  }

    async actualizarLista() {

      const itemsAnterior = this.recetas;
      if(this.busqueda == ""){
      this.recetas = (await this.servicio.obtenerRecetas(this.pagina, this.busqueda,false, this.filtro)).data;
      }
      else{
        this.recetas = (await this.servicio.obtenerRecetas(this.pagina, this.busqueda,true, this.filtro)).data;
      }
  
      if (this.recetas.length == 0 && this.pagina > 0){
        this.recetas = itemsAnterior
        this.pagina -= 1
      }
  }

  buscar(cadena : string){
    this.busqueda = cadena
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

  async verReceta(id : number){
  
    this.router.navigate(['/receta/' + id]);
  
  }

  cambiarFiltro(nuevoFiltro : string){
    console.log(nuevoFiltro);
    this.filtro = nuevoFiltro;
    this.actualizarLista();

  }

}