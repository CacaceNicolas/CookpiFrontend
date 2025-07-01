import { Injectable, OnInit } from '@angular/core';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class Servicio {
  constructor() {}

  url : string = "http://localhost:3000"

  async agregarIngrediente(nombre: string, calorias: number, proteinas: number, grasas: number, carbohidratos: number) {
    axios.post(`${this.url}/ingrediente`, {
        nombre: nombre,
        calorias: calorias,
        proteinas: proteinas,
        grasas: grasas,
        carbohidratos: carbohidratos,
        token : localStorage.getItem("jwt")
    });
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
        token : localStorage.getItem("jwt")
      
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

  async cambiarPassword(token: string, password: string){

    try {
      const response = await axios.post(`${this.url}/recuperarPassword/Cambiar`, {token: token, password: password});
      return response.data;
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      throw error;
    }

  }


  async crearUsuario(nombre: string, password: string, mail: string) {

    try {
      const response = await axios.post(`${this.url}/signup`, {nombre: nombre, password: password, mail: mail});
      console.log(response.data)
      
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
      console.error('Error al iniciar sesion:', error);
      throw error;
    }

  }

  enviarCorreoPassword(mail: string) {
    return axios.post('http://localhost:3000/recuperarPassword/', {mail: mail})
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


}