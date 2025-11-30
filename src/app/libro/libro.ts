import { Component } from '@angular/core';
import { Servicio } from '../servicio';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-libro',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './libro.html',
  styleUrl: './libro.css'
})
export class Libro {

constructor(private apiservice: Servicio, private route: ActivatedRoute, private router: Router) {}

recetas : {id: number, nombre: string, descripcion: string }[] = [] 
nombre : string = ""
descripcion : string = ""
idLibro : string = ""
nombreEditar = new FormControl("");
descripcionEditar = new FormControl("");
editando = false;
async ngOnInit(){

  this.idLibro = this.route.snapshot.paramMap.get('id') || '';
  
  try {
    // Verificar que el libro pertenece al usuario
    const verificacion = await this.apiservice.verificarPropiedadLibro(this.idLibro);
    
    if (!verificacion.data) {
      window.alert('No tienes acceso a este libro');
      this.router.navigate(['/usuario']);
      return;
    }

    const resp = (await this.apiservice.obtenerLibroPorId(this.idLibro)).data;

    this.descripcion = resp.descripcion;
    this.nombre  = resp.nombre;
    this.nombreEditar.setValue(this.nombre);
    this.descripcionEditar = new FormControl(this.descripcion);
    this.obtenerRecetas()
  } catch (error) {
    console.error('Error al verificar el libro:', error);
    window.alert('Error al cargar el libro');
    this.router.navigate(['/usuario']);
  }

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

  editarLibro(){
    this.editando = true;
  }

  async guardarCambios(){
    
    if (this.nombreEditar.value == "" || this.descripcionEditar.value == ""){
      window.alert("El nombre y la descripcion no pueden estar vacios");
      return;
    }
    await this.apiservice.editarLibro(this.idLibro, this.nombreEditar.value!, this.descripcionEditar.value!);
    this.nombre = this.nombreEditar.value || "";
    this.descripcion = this.descripcionEditar.value || "";
    this.editando = false;
    window.alert("Cambios guardados correctamente");
  }

  cancelarEdicion(){
    this.editando = false;
    this.nombreEditar.setValue(this.nombre);
    this.descripcionEditar.setValue(this.descripcion);
  }


}

