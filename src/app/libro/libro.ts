import { Component } from '@angular/core';
import { Servicio } from '../servicio';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-libro',
  imports: [],
  templateUrl: './libro.html',
  styleUrl: './libro.css'
})
export class Libro {
  
constructor(private apiservice: Servicio, private route: ActivatedRoute) {}

recetas : { nombre: string, descripcion: string }[] = [] 
nombre : string = ""
descripcion : string = ""
idLibro : string = ""



async ngOnInit(){

  this.idLibro = this.route.snapshot.paramMap.get('id') || '';

  const resp = (await this.apiservice.obtenerLibroPorId(this.idLibro)).data;

  this.descripcion = resp.descripcion;
  this.nombre  = resp.nombre;

  this.obtenerRecetas()
}

async obtenerRecetas(){
  
  const respReceta = (await this.apiservice.obtenerRecetasPorLibro(this.idLibro)).data;
  for (let i = 0; i < respReceta.length; i++) {
  
  this.recetas.push(respReceta[i])
    //this.recetas.push({nombre : respReceta[i].nombre,descripcion: respReceta[i].descripcion})
  }

  console.log(this.recetas);

}

}