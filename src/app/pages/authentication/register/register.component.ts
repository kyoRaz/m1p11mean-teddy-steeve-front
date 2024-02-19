import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../../services/http/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent {
  constructor(private httpservice: HttpService,private router: Router) {}

  servicename: string = "beauty/users/client";
  formData = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,Validators.minLength(8)]),
  });

  get f() {
    return this.formData.controls;
  }

  OnSubmit() {
    console.log('Formulaire soumis :', this.formData.value);
    if(this.formData.valid){
      console.log(this.formData.value)
      this. insertData();
    }
    // this.router.navigate(['/authentication/register']);
  }
  async insertData(){
    (await this.httpservice.postbod(this.servicename, this.formData.value)).subscribe(()=>{
      this.router.navigate(['/authentication/login']);
    });
  }
}
