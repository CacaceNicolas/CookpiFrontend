import { Component, OnInit } from '@angular/core';
import { Servicio } from '../servicio';
import { Router } from '@angular/router';



@Component({
  selector: 'app-validaste-cuenta',
  imports: [],
  templateUrl: './validaste-cuenta.html',
  styleUrl: './validaste-cuenta.css'
})
export class ValidasteCuenta {

  constructor(private router: Router, private apiservice: Servicio) {}

  ngOnInit(): void{

    this.apiservice

  }

  
  irAPaginaPrincipal(){
    this.router.navigate(['/']);
  }

}
