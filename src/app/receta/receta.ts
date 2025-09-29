import { Component } from '@angular/core';
import { Servicio } from '../servicio';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-receta',
  imports: [],
  templateUrl: './receta.html',
  styleUrl: './receta.css'
})
export class Receta {
  idReceta : string = "";
  procedimiento : String = "";
  nombre : String = "";
  descripcion : String = "";
                                           

  constructor(private apiservice: Servicio, private route: ActivatedRoute) {}
  async ngOnInit() {
    try {
      this.idReceta = this.route.snapshot.paramMap.get('id') || '';
      const resp = await this.apiservice.obtenerReceta(this.idReceta);
      console.log(resp.data);

      this.procedimiento = resp.data.procedimiento
      this.descripcion = resp.data.descripcion
      this.nombre = resp.data.nombre


    } catch (error) {
      console.error("Error al obtener la receta:", error);
    }
  }

}
