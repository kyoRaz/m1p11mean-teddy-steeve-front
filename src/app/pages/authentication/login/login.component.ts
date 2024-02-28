import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {

  formData: any = {};

  constructor(
    private router: Router,
    private loginService: LoginService,
    private localStorageService: LocalStorageService
  ) { }

  onSubmit(formData: any) {
    this.formData = formData;
    this.loginService.authToAPI(this.formData).subscribe(response => {
      console.log('Réponse de l\'API :', response);
      let user = response.user;
      let role = user.roleId;
      this.localStorageService.saveData('token', response.token);
      this.localStorageService.saveData('user', user);
      this.localStorageService.saveData('role', role);

      // Redirection par  Role
      const userRole = response.user.roleId.libelle;

      if (userRole === 'manager') {
        this.router.navigate(['/manager']);
      } else if (userRole === 'employe') {
        this.router.navigate(['/employe']);
      } else if (userRole === 'client') {
        this.router.navigate(['/client']);
      } else {
        console.error('Rôle d\'utilisateur non reconnu :', userRole);
        this.router.navigate(['/error']);
      }

    }, error => {
      console.error('Erreur lors de la requête POST :', error);
    });
  }

}
