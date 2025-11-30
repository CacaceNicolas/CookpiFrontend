import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Servicio } from './servicio';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private apiservice : Servicio) {}

  async canActivate(route: any, state: any): Promise <boolean> {
    // Verificar token
    if (!await this.apiservice.verificarToken()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Verificación adicional si la ruta requiere verificación
    if (!route.data?.['noRequiereVerificacion']) {
      const verificado = await this.estaVerificado();
      if (!verificado) {
        this.router.navigate(['/validecuenta']);
        return false;
      }
    }

    if (route.data?.['validasteCuenta']) {
      const verificado = await this.estaVerificado();
      if (verificado) {
        this.router.navigate(['/']);
        return false;
      }
    }
    return true;
  }

  async estaVerificado(): Promise<boolean> {
    try {
      const verificado = await this.apiservice.estaVerificado();
      return verificado.data;
    } catch (error) {
      console.error('Error verificando cuenta:', error);
      return false;
    }
  }
}