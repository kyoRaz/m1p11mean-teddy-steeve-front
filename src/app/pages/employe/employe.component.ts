import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from 'src/app/environments/environment';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  // styleUrls: ['./employe.component.scss']
})
export class EmployeComponent {

  formData: any = {};
  user: any = {};
  servicename: string = "users";
  idUser: string = "65bf662353006be666fda322"

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getOne(this.servicename, this.idUser).subscribe(response => {
      this.user = response;
    });
    console.log(this.user);
  }

  async onSubmit(formData: any) {
    console.log(formData);
    let url = "beauty/" + this.servicename + "/" + this.idUser;

    (await this.httpService.putData(url, formData)).subscribe(
      (response: any) => {
        alert("Success");
      },
      (error: any) => {
        console.error(error);
        alert("Une erreur s'est produite : " + error.message);
      }
    );
  }


}
