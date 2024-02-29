import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http/http.service';

export interface Section {
  name: string;
  updated: Date;
}
@Component({
  selector: 'app-sodl',
  templateUrl: './sodl.component.html',
  styleUrls: ['./sodl.component.scss']
})
export class SodlComponent implements OnInit{
  
  solde : any;
  formData = new FormGroup({
    _id: new FormControl(''),
    solde: new FormControl('', [Validators.required])
  });
  constructor(private httpService: HttpService){

  }
  
  ngOnInit(): void {
    
  }
  onSubmit(){
    
  }

  
}
