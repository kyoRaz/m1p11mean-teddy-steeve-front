import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../../services/http/http.service';
import { passwordMatchValidator } from './passwordMatchValidator';
import { TokenService } from "../../../services/token/token.service";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
})
export class AppSidePasswordComponent {
  
  constructor(
    private httpservice: HttpService,
    private router: Router,
    private token :TokenService) {}

  servicename: string = "beauty/users/pwsd";
  isidentique: boolean = false;
  formData = new FormGroup({
    password: new FormControl('', [Validators.required,Validators.minLength(8)]),
    password2: new FormControl('', [Validators.required]),
  }, passwordMatchValidator('password', 'password2'));
  params :any = {
    idUser: '',
    password: '',
    confirmPWD: '',
  };

  OnSubmit() {
    console.log(this.formData.value)
    if(!this.formData.valid){
      this.isidentique=true;
    }
    if(this.formData.valid){
      this.params.password = this.formData.get('password')?.value;
      this.params.confirmPWD = this.formData.get('password2')?.value;
      const user = this.token.getUser();
      console.log(user)
      this.params.idUser  = user.id;
      this.insertData(this.params);
      
    }
    // this.router.navigate(['/authentication/login']);
  }
  async insertData(data: any){
    (await this.httpservice.postbod(this.servicename, data)).subscribe(()=>{
      this.router.navigate(['/authentication/login']);
    });
  }
  
}
