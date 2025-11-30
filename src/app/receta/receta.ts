import { Component } from '@angular/core';
import { Servicio } from '../servicio';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ingredientes } from '../ingredientes/ingredientes';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-receta',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './receta.html',
  styleUrl: './receta.css'
})

export class Receta {
  editando : boolean = false;
  idReceta: string = "";
  procedimiento: string = "";
  nombre: string = "";
  descripcion: string = "";
  libros: { id: string, nombre: string }[] = [];
  mostrarSelect: boolean = false;
  mail : string = "";
  mailCreador : string = "";
  libroSeleccionado : string = "";
  constructor(private apiservice: Servicio, private route: ActivatedRoute, private router: Router) {};
  yaLikeada : boolean = false;
  likes : number = 0;
  ingredientes : {nombre: string, cantidad: number}[] = [];
  calorias : number = 0;
  carbohidratos : number = 0;
  proteinas : number = 0;
  grasas : number = 0;
  nombreCreador : string = "";
  tiempoEditar = new FormControl(0);
  nombreEditar = new FormControl("");
  momentoDelDiaEditar = new FormControl("");
  dietaEditar = new FormControl("");
  creador : boolean = false;
  tiempo : number = 0;
  momentoDelDia : string = "";
  dieta : string = "";
  descripcionEditar = new FormControl("");
  procedimientoEditar = new FormControl("");
  
  async ngOnInit() {
    try {
      this.idReceta = this.route.snapshot.paramMap.get('id') || '';
      
      const mailResp = await this.apiservice.obtenerMail()
      this.mail = mailResp.data
      this.actualizar()
      this.isYaLikeada();
      this.obtenerIngredientes();
    } catch (error) {
      console.error("Error al obtener la receta:", error);
    }

    try {
      
      const resp = (await this.apiservice.obtenerLibros()).data;
      console.log(resp);
      console.log("Longitud: " + resp.length)
      
      for (let i = 0; i < resp.length; i++) {
        this.libros.push({id : resp[i].id,nombre: resp[i].nombre})
      }

      console.log(this.libros)

      this.mostrarSelect = true;
    } catch (error) {
      console.error("Error al obtener los libros:", error);
    }
  } 

  async agregarALibro(){  
    if (this.libroSeleccionado == ""){
      window.alert("Seleccione un libro")
    }
    else{
      window.alert("Receta agregada al libro")
      this.apiservice.agregarRecetaALibro(this.libroSeleccionado, this.idReceta);
    }
  }

  async agregarConsumo(){
    window.alert("Consumo cargado")
    this.apiservice.agregarConsumo(+this.idReceta)
  }


  async like(){
    if (!this.yaLikeada) {
    this.yaLikeada = true;
    this.likes = (this.likes || 0) + 1;
    try {
      await this.apiservice.like(+this.idReceta);

    } catch (err) {

      this.yaLikeada = false;
      this.likes =  this.likes - 1;
      console.error("No se pudo likear:", err);
    }
  } else {
    this.yaLikeada = false;
    this.likes = ((this.likes || 1) - 1);
    try {
      await this.apiservice.eliminarLike(+this.idReceta);
    } catch (err) {

      this.yaLikeada = true;
      this.likes = (this.likes || 0) + 1;
      console.error("No se pudo eliminar like:", err);
    }
  }
  }

  async actualizar(){
    const resp = await this.apiservice.obtenerReceta(this.idReceta);
    
    this.procedimiento = resp.data.procedimiento;
    this.descripcion = resp.data.descripcion;
    this.nombre = resp.data.nombre;
    this.calorias = resp.data.calorias;
    this.carbohidratos = resp.data.carbohidratos;
    this.proteinas = resp.data.proteinas;
    this.grasas = resp.data.grasas;
    this.tiempo = resp.data.tiempo;
    this.momentoDelDia = resp.data.momentoDelDia;
    this.dieta = resp.data.dieta;
    this.likes = resp.data.cantLikes;
    this.mailCreador = resp.data.usuarioCreadorId;
    this.nombreCreador = (await this.apiservice.obtenerNombreUsuario(this.mailCreador)).data;
    this.creador = (this.mailCreador == this.mail);
    this.tiempoEditar.setValue(resp.data.tiempo);
    this.nombreEditar.setValue(this.nombre);
    this.momentoDelDiaEditar.setValue(this.momentoDelDia);
    this.dietaEditar.setValue(this.dieta);
    this.descripcionEditar.setValue(this.descripcion);
    this.procedimientoEditar.setValue(this.procedimiento);
  }





  async isYaLikeada(){
    
    this.yaLikeada = (await this.apiservice.yaLikeada(+this.idReceta)).data
  }

  async obtenerIngredientes(){
    console.log("Obteniendo ingredientes")
    this.ingredientes = (await this.apiservice.obtenerIngredientesDeReceta(this.idReceta)).data;
  }

  irAPaginaPrincipal(){
    this.router.navigate(['/']);
  }

  irAPaginaUsuario(){
    this.router.navigate(['/usuario']);
  }

  guardarCambios(){
    if (!this.validarCampos()) {
      return;
    }
    this.nombre = this.nombreEditar.value ?? "";
    this.descripcion = this.descripcionEditar.value ?? "";
    this.procedimiento = this.procedimientoEditar.value ?? "";
    this.tiempo = this.tiempoEditar.value ?? 0;
    this.momentoDelDia = this.momentoDelDiaEditar.value ?? "";
    this.dieta = this.dietaEditar.value ?? "";
    try {  
    this.apiservice.editarReceta(this.idReceta, this.nombre, this.descripcion, this.procedimiento, this.tiempo, this.momentoDelDia, this.dieta);
    window.alert("Receta editada correctamente");
  } catch (error) {
    window.alert("Error al editar la receta");
    console.error("Error al editar la receta:", error);
  }
    this.editando = false;
  }
  validarCampos(): boolean {
    if (this.nombreEditar.value === "" || !this.nombreEditar.value ||
        this.descripcionEditar.value === "" || !this.descripcionEditar.value ||
        this.procedimientoEditar.value === "" || !this.procedimientoEditar.value ||
        this.momentoDelDiaEditar.value === "" || !this.momentoDelDiaEditar.value ||
        this.dietaEditar.value === "" || !this.dietaEditar.value) {
      window.alert("Todos los campos son obligatorios");
      return false;
    }
    return true;
  }

  cancelarEdicion(){
    this.editando = false;
    this.nombreEditar.setValue(this.nombre);
    this.descripcionEditar.setValue(this.descripcion);
    this.procedimientoEditar.setValue(this.procedimiento);
    this.tiempoEditar.setValue(this.tiempo);
    this.momentoDelDiaEditar.setValue(this.momentoDelDia);
    this.dietaEditar.setValue(this.dieta);
  }

  editar(){
    this.editando = true;
  }

}