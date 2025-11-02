import { Component } from '@angular/core';
import { Servicio } from '../servicio';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ingredientes } from '../ingredientes/ingredientes';

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
  constructor(private apiservice: Servicio, private route: ActivatedRoute) {};
  yaLikeada : boolean = false;
  likes : number = 0;
  ingredientes : {nombre: string, cantidad: number}[] = [];
  calorias : number = 0;
  carbohidratos : number = 0;
  proteinas : number = 0;
  grasas : number = 0;




  async ngOnInit() {
    try {
      this.idReceta = this.route.snapshot.paramMap.get('id') || '';
      const resp = await this.apiservice.obtenerReceta(this.idReceta);
      const mailResp = await this.apiservice.obtenerMail()
      this.mail = mailResp.data
      console.log(mailResp)
      this.procedimiento = resp.data.procedimiento;
      this.descripcion = resp.data.descripcion;
      this.nombre = resp.data.nombre;
      this.calorias = resp.data.calorias;
      this.carbohidratos = resp.data.carbohidratos;
      this.proteinas = resp.data.proteinas;
      this.grasas = resp.data.grasas;
      this.likes = resp.data.cantLikes;
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
    console.log("sL")
    console.log(this.yaLikeada)
    if (!this.yaLikeada){
      this.apiservice.like(+this.idReceta, this.mail);
    }

  }

  async isYaLikeada(){
    
    this.yaLikeada = (await this.apiservice.yaLikeada(+this.idReceta, this.mail)).data
  }



  async obtenerIngredientes(){
    console.log("Obteniendo ingredientes")
    this.ingredientes = (await this.apiservice.obtenerIngredientesDeReceta(this.idReceta)).data;
  
  }}