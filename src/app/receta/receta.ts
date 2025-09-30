import { Component } from '@angular/core';
import { Servicio } from '../servicio';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-receta',
  imports: [CommonModule],
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

  constructor(private apiservice: Servicio, private route: ActivatedRoute) {}

  async ngOnInit() {
    try {
      this.idReceta = this.route.snapshot.paramMap.get('id') || '';
      const resp = await this.apiservice.obtenerReceta(this.idReceta);
      const mailResp = await this.apiservice.obtenerMail()
      this.mail = mailResp.data.mail
      console.log(mailResp)
      this.procedimiento = resp.data.procedimiento;
      this.descripcion = resp.data.descripcion;
      this.nombre = resp.data.nombre;

      console.log(this.mail)

    } catch (error) {
      console.error("Error al obtener la receta:", error);
    }
  }

  async obtenerLibros() {

    try {
      const resp = (await this.apiservice.obtenerLibros(this.mail)).data;
      console.log(resp);
      for (let i = 0; i < resp.length; i++) {
      this.libros.push({id : resp[i].id,nombre: resp[i].nombre})
      }

      console.log(this.libros)

      this.mostrarSelect = true;
    } catch (error) {
      console.error("Error al obtener los libros:", error);
    }
  }
}