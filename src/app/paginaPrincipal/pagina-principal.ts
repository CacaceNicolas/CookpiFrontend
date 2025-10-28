import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Servicio } from '../servicio';
import { Route } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pagina-principal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagina-principal.html',
  styleUrl: './pagina-principal.css'
})
export class PaginaPrincipalComponent {
  
  usuario: any;
  recetas: any[] = [];
  recomendacionesKcal : any[] = [];
  recetaDestacada: any;
  pagina = 0;
  paginaRec = 0;
  busqueda = "";
  filtro : string = "";
  mail : string = "";
  consumos: {nombre : string, momentoDelDia : string, calorias : number}[] =  [];
  reqCalorico : number =  0;
  caloriasRestantes : number = 0;

  constructor(private servicio: Servicio, @Inject(Router) private router : Router) {}

  async ngOnInit() {
    
    const mailResp = await this.servicio.obtenerMail()
    this.mail = mailResp.data
    this.consumos = (await this.servicio.obtenerConsumoUsuario(this.mail)).data
    this.usuario = (await this.servicio.obtenerUsuario(this.mail)).data

    this.reqCalorico = this.usuario.reqCalorico
    this.caloriasRestantes = this.reqCalorico
    
    
    this.calcularCalorias()
    
    try {
      this.actualizarLista()
      this.obtenerRecomendaciones()
    } catch (error) {
      console.error('Error cargando las recetas', error);
    }  
  }

    async actualizarLista() {

      const itemsAnterior = this.recetas;
      if(this.busqueda == ""){
      this.recetas = (await this.servicio.obtenerRecetas(this.pagina, this.busqueda,false, this.filtro)).data;
      }
      else{
        this.recetas = (await this.servicio.obtenerRecetas(this.pagina, this.busqueda,true, this.filtro)).data;
      }
  
      if (this.recetas.length == 0 && this.pagina > 0){
        this.recetas = itemsAnterior
        this.pagina -= 1
      }
  }

  buscar(cadena : string){
    this.busqueda = cadena
    this.actualizarLista()
  }

  async restarPagina(){
    if (this.pagina > 0){
      this.pagina -= 1
    }
    this.actualizarLista()
  }

  async sumarPagina(){
    this.pagina += 1
    this.actualizarLista()
  }

  async verReceta(id : number){
  
    this.router.navigate(['/receta/' + id]);
  
  }

  cambiarFiltro(nuevoFiltro : string){
    console.log(nuevoFiltro);
    this.filtro = nuevoFiltro;
    this.actualizarLista();

  }


  calcularCalorias(){

    this.consumos.forEach((consumo) => {
      this.caloriasRestantes -= consumo.calorias
    });

  }

  async restarPaginaRecomendaciones(){
    if (this.paginaRec > 0){
      this.paginaRec -= 1
    }
    this.obtenerRecomendaciones()
  }

  async sumarPaginaRecomendaciones(){
    this.paginaRec += 1
    this.obtenerRecomendaciones()
  }


  
  async obtenerRecomendaciones(){

    const itemsAnterior = this.recomendacionesKcal;
    
      
    this.recomendacionesKcal = (await this.servicio.obtenerRecomendaciones(this.paginaRec, this.caloriasRestantes)).data;

    if (this.recomendacionesKcal.length == 0 && this.paginaRec > 0){
      this.recomendacionesKcal = itemsAnterior
      this.paginaRec -= 1
    }
  }
}