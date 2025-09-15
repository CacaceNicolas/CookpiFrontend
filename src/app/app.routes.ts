import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { RecuperarPassword } from './recuperar-password/recuperar-password';
import { EnviarCorreoPassword } from './enviar-correo-password/enviar-correo-password';
import { Ingredientes } from './ingredientes/ingredientes';
import { AuthGuard } from './auth-guard';
import { PaginaPrincipalComponent } from './paginaPrincipal/pagina-principal'; 
import { CrearReceta } from './crear-receta/crear-receta';

export const routes: Routes = [
  { path : "", component: PaginaPrincipalComponent }, 
  { path : "login", component: Login}, 
  { path : "signup", component: Signup},
  { path : "recuperarPassword/:token", component : RecuperarPassword},
  { path : "enviarCorreoPassword", component : EnviarCorreoPassword},
  { path : "crearReceta", component : CrearReceta},
  { path : "ingredientes", component : Ingredientes, canActivate: [AuthGuard]},
];
