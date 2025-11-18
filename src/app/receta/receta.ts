import { Component } from '@angular/core';
import { Servicio } from '../servicio';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ingredientes } from '../ingredientes/ingredientes';
import { Router } from '@angular/router';



@Component({
  selector: 'app-receta',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './receta.html',
  styleUrl: './receta.css'
})

export class Receta {
  idReceta: string = "";
  procedimiento: string = "";
  nombre: string = "";
  descripcion: string = "";
  libros: { id: string, nombre: string }[] = [];
  mostrarSelect: boolean = false;
  mail : string = "";
  libroSeleccionado : string = "";
  constructor(private apiservice: Servicio, private route: ActivatedRoute, private router: Router) {};
  yaLikeada : boolean = false;
  likes : number = 0;
  ingredientes : {nombre: string, cantidad: number}[] = [];
  calorias : number = 0;
  carbohidratos : number = 0;
  proteinas : number = 0;
  grasas : number = 0;
  mailCreador : string = "";
  


  async ngOnInit() {
    try {
      this.idReceta = this.route.snapshot.paramMap.get('id') || '';
      
      const mailResp = await this.apiservice.obtenerMail()
      this.mail = mailResp.data
      console.log(mailResp)
      this.actualizar()
      console.log(this.mail);
      this.isYaLikeada();
      this.obtenerIngredientes();
    } catch (error) {
      console.error("Error al obtener la receta:", error);
    }

    try {
      
      const resp = (await this.apiservice.obtenerLibros(this.mail)).data;
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
    this.apiservice.agregarRecetaALibro(this.libroSeleccionado, this.idReceta);
  }

  async agregarConsumo(){
    this.apiservice.agregarConsumo(+this.idReceta, this.mail)
  }


  async like(){
    if (!this.yaLikeada) {
    this.yaLikeada = true;
    this.likes = (this.likes || 0) + 1;
    try {
      await this.apiservice.like(+this.idReceta, this.mail);

    } catch (err) {

      this.yaLikeada = false;
      this.likes =  this.likes - 1;
      console.error("No se pudo likear:", err);
    }
  } else {
    this.yaLikeada = false;
    this.likes = ((this.likes || 1) - 1);
    try {
      await this.apiservice.eliminarLike(+this.idReceta, this.mail);
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
    this.mailCreador = resp.data.
    this.descripcion = resp.data.descripcion;
    this.nombre = resp.data.nombre;
    this.calorias = resp.data.calorias;
    this.carbohidratos = resp.data.carbohidratos;
    this.proteinas = resp.data.proteinas;
    this.grasas = resp.data.grasas;
    this.likes = resp.data.cantLikes;
  }





  async isYaLikeada(){
    
    this.yaLikeada = (await this.apiservice.yaLikeada(+this.idReceta, this.mail)).data
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


}