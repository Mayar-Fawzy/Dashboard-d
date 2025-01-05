import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _isPlatformId = inject(PLATFORM_ID)
  const _router = inject(Router);
 
   if (isPlatformBrowser(_isPlatformId)) {
     if (localStorage.getItem('userToken') !== null) {
       return true;
     } else {
       _router.navigate(['/login']);
       return false;
     }
   } else {
     return false;
   } 
};
