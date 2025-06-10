import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { RecuperarPassword } from './recuperar-password/recuperar-password';
import { EnviarCorreoPassword } from './enviar-correo-password/enviar-correo-password';
import { Ingredientes } from './ingredientes/ingredientes';

export const routes: Routes = [

    {path : "logni", component: Login},
    {path : "singup", component: Signup},
    {path : "recuperarPassword/:token", component : RecuperarPassword},
    {path : "enviarCorreoPassword", component : EnviarCorreoPassword},
    {path : "ingredientes", component : Ingredientes} 
];
