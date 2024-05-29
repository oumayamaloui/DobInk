import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from "../services/auth-service/auth.service"; // Import the inject function

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inject the AuthService
  const router = inject(Router); // Inject the Router

  // Check if the user is logged in
  const isLoggedIn = authService.isLoggedIn();

  if (!isLoggedIn) {
    // If the user is not logged in, redirect to the root path
    router.navigate(['/login']);
    return false;
  }

  // If the user is logged in, allow access to the requested route
  return true;
};
export const authGuardConnected: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inject the AuthService
  const router = inject(Router); // Inject the Router

  // Check if the user is logged in
  const isLoggedIn = authService.isLoggedIn();

  if (isLoggedIn) {
    // If the user is not logged in, redirect to the root path
    router.navigate(['']);
    return false;
  }

  // If the user is logged in, allow access to the requested route
  return true;
};

