import { Servicio } from '../servicio';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario',

  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css'
})
export class Usuario {
  
  
  constructor(private apiservice : Servicio){}

  usuario: any;

  nombre: string = "";
  descripcion: string = "";
  mail : string = "";
  peso: number = 0;
  altura: number = 0;
  reqCalorico: number = 0;
  edad: number = 0;

  consumos: {nombre : string, momentoDelDia : string, calorias : number}[] =  [];





  async ngOnInit(){

    const mailResp = await this.apiservice.obtenerMail()
    this.mail = mailResp.data

    this.usuario = (await this.apiservice.obtenerUsuario(this.mail)).data

    this.consumos = (await this.apiservice.obtenerConsumoUsuario(this.mail)).data

    console.log(this.consumos);

    this.nombre = this.usuario.nombre
    this.descripcion = this.usuario.descripcion
    this.peso = this.usuario.peso
    this.altura = this.usuario.altura
    this.reqCalorico = this.usuario.reqCalorico
    this.edad = this.usuario.edad




  }




}
