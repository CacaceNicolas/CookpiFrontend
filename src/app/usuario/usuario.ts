import { Servicio } from '../servicio';
import { Component } from '@angular/core';

@Component({
  selector: 'app-usuario',
  imports: [],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css'
})
export class Usuario {

constructor(private apiservice : Servicio){}

  nombre: string = "";
  descripcion: string = "";
  mail : string = "";
  peso: number = 0;
  altura: number = 0;
  reqCalorico: number = 0;
  edad: number = 0;


  ngOnInit(){

    



  }




}
