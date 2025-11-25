import { Injectable, OnInit } from '@angular/core';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class Servicio {
  constructor() {}

  url : string = "https://cookpibackend.policloudservices.ipm.edu.ar/"

  async agregarIngrediente(nombre: string, calorias: number, proteinas: number, grasas: number, carbohidratos: number) {
    axios.post(`${this.url}/ingrediente`, {
        nombre: nombre,
        calorias: calorias,
        proteinas: proteinas,
        grasas: grasas,
        carbohidratos: carbohidratos,
    }, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}});
  }
   
  async obtenerRecetas(pagina : number, busqueda : string, buscar : boolean, filtro : string){
    if (buscar){
      if(filtro == ""){
        return await axios.get(`${this.url}/receta/pag/` + pagina + `/` + busqueda, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}});
      }
      else{
        return await axios.get(`${this.url}/receta/pag/` + pagina + `/` + busqueda + `/` + filtro, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}});
      }
    }
    else{
      if (filtro == ""){
        return await axios.get(`${this.url}/receta/pag/` + pagina, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}});
      }
      else{
        return await axios.get(`${this.url}/receta/pagf/` + pagina + `/` + filtro, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}}); 
      }
    }
  }
  
  async agregarReceta(nombre: string, descripcion:string, procedimiento:string, momentoDelDia:string,ingredientes:{codigo:string, cantidad:number}[], tiempo : number, dieta : string) {
    return axios.post(`${this.url}/receta`, {
        nombre: nombre,
        descripcion : descripcion,
        momentoDelDia: momentoDelDia,
        procedimiento : procedimiento,
        ingredientes : ingredientes,
        cantLikes : 0,
        tiempo : tiempo,
        dieta : dieta,
    }, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}});
  }

  async agregarLibro(nombre : string, descripcion : string){
    return axios.post(`${this.url}/libro`, {
        nombre: nombre,
        descripcion : descripcion,
    }, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}});
  }
  
  async obtenerReceta(id: string){
    return axios.get(`${this.url}/receta/` + id, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}});
  }

  async eliminarIngrediente(id: string) {
    try {
      const response = await axios.delete(`${this.url}/ingrediente/${id}`, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}});
      return response.data;
    } catch (error) {
      console.error('Error al eliminar el ingrediente:', error);
      throw error;
    }
  }
  async modIngrediente(id:string, nombre: string, calorias: number, proteinas: number, grasas: number, carbohidratos: number){

    try{
      const resp = await axios.put(`${this.url}/ingrediente`,{
        id:id,
        nombre: nombre,
        calorias: calorias,
        proteinas: proteinas,
        grasas: grasas,
        carbohidratos: carbohidratos,
      }, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}});

    }catch(error){
      console.error("No se pudo cambiar el ingrediente", error);
    }
  }


  async getIngredientes(pagina : number, busqueda : string) {
    try {
      const response = await axios.get(`${this.url}/ingrediente/` + pagina + "/" + busqueda, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}});
      return response.data;
    } catch (error) {
      console.error('Error al obtener los ingredientes:', error);
      throw error;
    }
  }

  async getIngredientesTodos(){
    try {
      const response = await axios.get(`${this.url}/ingrediente/`, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}});
      return response.data;
    } catch (error) {
      console.error('Error al obtener los ingredientes:', error);
      throw error;
    }
  }

  async cambiarPassword(token: string, password: string){
    try {
      const response = await axios.post(`${this.url}/recuperarPassword/Cambiar`, {password: password}, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}});
      return response.data;
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      throw error;
    }

  }


  async crearUsuario(nombre: string, password: string, mail: string,altura : number, peso: number, objetivo: number, edad : number, genero: number) {

    try {

      const response = await axios.post(`${this.url}/signup`, {nombre: nombre, password: password, mail: mail, altura: altura, peso:peso, objetivo: objetivo, edad: edad, genero:genero}, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}});

      
      localStorage.setItem("jwt", response.data)

      return response.data;

    } catch (error) {
      console.error('Error al crear al usuario:', error);
      throw error;
    }

  }


  async iniciarSesion(nombre: string, password: string) {

    try {

      console.log('Intentando iniciar sesión con:', {nombre, password});

      const response = await axios.post(`${this.url}/login`, {nombre: nombre, password: password});

      localStorage.setItem("jwt", response.data)

      console.log(localStorage.getItem("jwt"));

      return response.data;
      
    } catch (error) {

      throw error;

    }

  }

  enviarCorreoPassword(mail: string) {
    return axios.post(this.url + '/recuperarPassword/', {mail: mail}, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}})
      .then(response => response.data)
      .catch(error => {
        console.error('Error al enviar el correo:', error);
        throw error;
      });
  }


  async verificarToken(){

    if(localStorage.getItem("jwt")){
      return axios.get(`${this.url}/checkLogIn`, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}})
    }
    else{
      return false
    }
  }

  async obtenerLibros(mailUs : string){
    
    return await axios.get(`${this.url}/libro/pormail/` + mailUs, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}})

  }


  async obtenerMail(){

    return await axios.get(`${this.url}/login/mail`, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}})
  
  }

  async obtenerUsuario(mail: string){

    return await axios.get(`${this.url}/usuario/` + mail, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}})
  
  }

  
  async agregarRecetaALibro(idLibro : string, idReceta : string){
        axios.post(`${this.url}/libro/agregarReceta`,{
        libroId : idLibro,
        recetaId : idReceta,
    }, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}});
  }


  async obtenerRecetasPorLibro(idLibro : string){

    return await axios.get(`${this.url}/libro/recetas/` + idLibro, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}})
    
  }

  async obtenerLibroPorId(idLibro : string){
    return await axios.get(`${this.url}/libro/porid/` + idLibro, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}})
  }

  async obtenerConsumoUsuario(mail: string){
    return await axios.get(`${this.url}/consumo/` + mail, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}})
  }


  async agregarConsumo(idReceta : number, mail : string){
    return await axios.post(`${this.url}/consumo/`, {idReceta: idReceta, mail: mail}, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}})
  }

  async like( idReceta : number, mail : string){

    return await axios.post(`${this.url}/usuario/like`, {recetaId: idReceta, mail: mail}, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}})

  }

  async yaLikeada( idReceta : number, mail : string){

    return await axios.get(`${this.url}/usuario/like/` + mail + `/` + idReceta, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}})

  }

  async obtenerRecomendaciones(kcaloriasUsuario: number, paginaRecomendaciones: number){
    return await axios.get(`${this.url}/receta/pagr/` + kcaloriasUsuario + `/` + paginaRecomendaciones, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}});
  }


  async obtenerIngredientesDeReceta(idReceta: string){
    return await axios.get(`${this.url}/receta/ingredientes/` + idReceta, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}});
  }


  async borrarConsumo(mail: string, idReceta: number){
    return await axios.delete(`${this.url}/consumo/` + mail + `/` + idReceta, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}});
  }

  async obtenerRecetaDelDia(){
    return await axios.get(`${this.url}/receta/del/dia`, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}});
  }

  async eliminarRecetaDelLibro(idLibro : string, idReceta : string){
    return await axios.delete(`${this.url}/libro/eliminarReceta/` + idLibro + `/` + idReceta, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}}, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}});
  }

  async eliminarLibro(idLibro : string){ 
    return await axios.delete(`${this.url}/libro/` + idLibro, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}});
  }

  async eliminarLike(idReceta : number, mail : string){
    return await axios.delete(this.url + "/usuario/like/" + idReceta + "/" + mail, {headers : {authorization : "Bearer " + localStorage.getItem("jwt")}})
  }

}
