import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-sodl',
  templateUrl: './sodl.component.html',
  styleUrls: ['./sodl.component.scss']
})
export class SodlComponent implements OnInit{
  
  constructor(private httpService: HttpService){

  }

  ngOnInit(): void {
    
  }

}
