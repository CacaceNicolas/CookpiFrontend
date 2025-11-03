import { Servicio } from '../servicio';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',

  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css'
})
export class Usuario {


  constructor(private apiservice : Servicio, private router: Router){}

  usuario: any;

  nombre: string = "";
  descripcion: string = "";
  mail : string = "";
  peso: number = 0;
  altura: number = 0;
  reqCalorico: number = 0;
  edad: number = 0;
  caloriasRestantes : number = this.reqCalorico
  libros: {id : number, nombre : string, descripcion : string}[] = [];

  consumos: {id : number, nombre : string, momentoDelDia : string, calorias : number, cantidad : number}[] = [];

  async ngOnInit(){

    const mailResp = await this.apiservice.obtenerMail()
    this.mail = mailResp.data
    this.usuario = (await this.apiservice.obtenerUsuario(this.mail)).data
    await this.cargarConsumos();
    console.log(this.consumos);
    this.nombre = this.usuario.nombre
    this.descripcion = this.usuario.descripcion
    this.peso = this.usuario.peso
    this.altura = this.usuario.altura
    this.reqCalorico = this.usuario.reqCalorico
    this.edad = this.usuario.edad
    this.caloriasRestantes = this.reqCalorico
    this.calcularCalorias()
    this.obtenerLibros();

  }


  calcularCalorias(){
    this.caloriasRestantes = this.reqCalorico
    this.consumos.forEach((consumo) => {
      this.caloriasRestantes -= consumo.calorias * consumo.cantidad;
    });

  }

  async agregarConsumo(idReceta: number){
    console.log("Agregando consumo de receta id: " + idReceta);
    await this.apiservice.agregarConsumo(+idReceta, this.mail);
    await this.actualizarInfo();  
    console.log("llego hasta acá");
  }

  async borrarConsumo(idReceta: number){
    console.log("Borrando consumo de receta id: " + idReceta);
    await this.apiservice.borrarConsumo(this.mail, idReceta);
    await this.actualizarInfo();
  }

  async obtenerLibros(){
    const resp = (await this.apiservice.obtenerLibros(this.mail)).data;
    this.libros = resp;
    console.log(this.libros);
  }


  async actualizarInfo(){
    this.consumos = (await this.apiservice.obtenerConsumoUsuario(this.mail)).data
    this.caloriasRestantes = this.reqCalorico
    this.calcularCalorias();
    console.log(this.consumos)
  }

  verLibro(idLibro: number){
    this.router.navigate(['/libro/' + idLibro]);
  }

  verReceta(idReceta: number){
    this.router.navigate(['/receta/' + idReceta]);
  }

  eliminarLibro(idLibro: number){
    console.log("Eliminando libro id: " + idLibro);
    this.apiservice.eliminarLibro(idLibro.toString());
    this.libros = [];
    this.obtenerLibros();
  }

  async crearLibro(){
    this.router.navigate(['/crearibro']);
  }

  irAPaginaPrincipal(){
    this.router.navigate(['/']);
  }

  irAPaginaUsuario(){
    this.router.navigate(['/usuario']);
  }


  crearReceta(){
    this.router.navigate(['/crearReceta']);
  }

  cerrarSesion(){
    localStorage.removeItem("jwt");
    this.router.navigate(['/']);
  }
}