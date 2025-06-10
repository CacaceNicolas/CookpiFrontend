import { Component, OnInit } from '@angular/core';
import { Servicio } from '../servicio';

@Component({
  selector: 'app-validaste-cuenta',
  imports: [],
  templateUrl: './validaste-cuenta.html',
  styleUrl: './validaste-cuenta.css'
})
export class ValidasteCuenta {

  constructor(private apiservice : Servicio){}

  ngOnInit(): void{

    this.apiservice

  }


}
