import { E } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent implements OnInit {

  formData: any = {};
  erreur= false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private localStorageService: LocalStorageService
  ) { }
  ngOnInit(): void {
    this.erreur=false;
  }

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
      // alert(userRole);
      if (userRole === 'manager') {
        this.router.navigate(['/manager']);
      } else if (userRole === 'employe') {
        this.router.navigate(['/employe']);
      } else if (userRole === 'client') {
        this.router.navigate(['/client/rdv']);
      } else {
        console.error('Rôle d\'utilisateur non reconnu :', userRole);
        // this.router.navigate(['/error']);
      }

    }, error => {
      this.erreur=true;
      console.error('Erreur lors de la requête POST :', error);
    });
  }

}
