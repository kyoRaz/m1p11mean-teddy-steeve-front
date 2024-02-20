import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../services/http/http.service';
import { TokenService } from "../../../services/token/token.service";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html'
})
export class AppIconsComponent implements OnInit {
  
  servicename: string = 'beauty/users/activation';
  param: any = {
    token:""
  }

  constructor(
    private httpservice: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private token :TokenService) { }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if(token!==null){
      this.param.token = token;
      this.activate();
    }
    // alert("echec")
    // this.router.navigate(['/authentication/login']);
  }
  async activate(){
    (await this.httpservice.postbod(this.servicename, this.param)).subscribe((data)=>{
      if (data) {
        
      this.token.saveUser(data);
        this.router.navigate(['/authentication/password']);
      }
      else{

      }
      // this.router.navigate(['/authentication/login']);
    });
  }

}
