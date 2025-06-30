import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Servicio } from '../servicio';

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

  constructor(private servicio: Servicio) {}

  async ngOnInit() {
    try {

      //const data = await this.servicio.getIngredientes();
      //this.recetas = Array.isArray(data) ? data : [data]; 

      if (this.recetas.length > 0) {
        this.recetaDestacada = this.recetas[Math.floor(Math.random() * this.recetas.length)];
      }
      
    } catch (error) {
      console.error('Error cargando las recetas', error);
    }
  }
}

