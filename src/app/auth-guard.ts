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

  async canActivate(): Promise <boolean> {
    if (await this.apiservice.verificarToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}