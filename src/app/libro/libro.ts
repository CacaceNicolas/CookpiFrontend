import { Component } from '@angular/core';
import { Servicio } from '../servicio';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-libro',
  imports: [CommonModule],
  templateUrl: './libro.html',
  styleUrl: './libro.css'
})
export class Libro {

constructor(private apiservice: Servicio, private route: ActivatedRoute, private router: Router) {}

recetas : {id: number, nombre: string, descripcion: string }[] = [] 
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
  console.log(respReceta)
  for (let i = 0; i < respReceta.length; i++) {
  console.log(respReceta[i])
  this.recetas.push(respReceta[i])
  }

 

}

  async verReceta(id : number){
  
    this.router.navigate(['/receta/' + id]);
  
  }


  async eliminarReceta(id : number){
    console.log("eliminar receta " + id + " del libro " + this.idLibro);
    await this.apiservice.eliminarRecetaDelLibro(this.idLibro, id.toString());
    this.recetas = []
    this.obtenerRecetas();
  }


  irAPaginaUsuario(){
    this.router.navigate(['/usuario']);
  }

  irAPaginaPrincipal(){
    this.router.navigate(['/']);
  }

}