import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { RecuperarPassword } from './recuperar-password/recuperar-password';
import { EnviarCorreoPassword } from './enviar-correo-password/enviar-correo-password';
import { Ingredientes } from './ingredientes/ingredientes';
import { AuthGuard } from './auth-guard';
import { PaginaPrincipalComponent } from './paginaPrincipal/pagina-principal'; 
import { CrearReceta } from './crear-receta/crear-receta';
import { CrearLibro } from './crear-libro/crear-libro';
import { Receta } from './receta/receta';
import { Libro } from './libro/libro';
import { Usuario } from './usuario/usuario';
import { ValideSuCuenta } from './valide-su-cuenta/valide-su-cuenta';


export const routes: Routes = [
  { path : "", component: PaginaPrincipalComponent, canActivate: [AuthGuard]},
  { path : "login", component: Login, data: { noRequiereVerificacion: true }},
  { path : "signup", component: Signup, data: { noRequiereVerificacion: true }},
  { path : "recuperarPassword/:token", component : RecuperarPassword},
  { path : "enviarCorreoPassword", component : EnviarCorreoPassword},
  { path : "crearReceta", component : CrearReceta, canActivate: [AuthGuard]},
  { path : "receta/:id", component : Receta, canActivate: [AuthGuard]},
  { path : "libro/:id", component : Libro, canActivate: [AuthGuard]},
  { path : "crearibro", component : CrearLibro, canActivate: [AuthGuard]},
  { path : "usuario", component : Usuario, canActivate: [AuthGuard]},
  { path : "ingredientes", component : Ingredientes, canActivate: [AuthGuard]},
  { path : "validecuenta", component : ValideSuCuenta, canActivate: [AuthGuard], data: { noRequiereVerificacion: true, validasteCuenta: true }},
];