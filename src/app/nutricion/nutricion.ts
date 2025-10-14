import { Component } from '@angular/core';
import { Servicio } from '../servicio';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nutricion',
  imports: [],
  templateUrl: './nutricion.html',
  styleUrl: './nutricion.css'
})
export class Nutricion {

  constructor(private apiservice: Servicio, private route: ActivatedRoute) {}

  mail : string = ""; 


  async ngOnInit(){
    const mailResp = await this.apiservice.obtenerMail()
    this.mail = mailResp.data
  }

  agregarConsumo(){

    this.apiservice.agregarConsumo(1, this.mail)

  }



}
