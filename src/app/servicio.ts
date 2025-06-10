import { Injectable, OnInit } from '@angular/core';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class Servicio {
  constructor() {}

  ngOnInit(){
    this.getIngredientes()
  }


  async agregarIngrediente(nombre: string, calorias: number, proteinas: number, grasas: number, carbohidratos: number) {
    axios.post('http://localhost:3000/ingrediente', {
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
      const response = await axios.delete(`http://localhost:3000/ingrediente/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar el ingrediente:', error);
      throw error;
    }
  }
  async modIngrediente(id:string, value: any, nombreValue : string){

    try{
      const resp = await axios.put('http://localhost:3000/ingrediente',{
        id : id,
        nombreValue : value
      });

    }catch(error){
      console.error("No se pudo cambiar el ingrediente", error);
    }
  }


  async getIngredientes() {
    try {
      const response = await axios.get('http://localhost:3000/ingrediente/3');
      return response.data;
    } catch (error) {
      console.error('Error al obtener los ingredientes:', error);
      throw error;
    }
  }

  async cambiarPassword(token: string, password: string){

    try {
      const response = await axios.post('http://localhost:3000/recuperarPassword/Cambiar', {token: token, password: password});
      return response.data;
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      throw error;
    }

  }


  async crearUsuario(nombre: string, password: string, mail: string) {

    try {
      const response = await axios.post('http://localhost:3000/signup', {nombre: nombre, password: password, mail: mail});
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

      const response = await axios.post('http://localhost:3000/login', {nombre: nombre, password: password});

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



}