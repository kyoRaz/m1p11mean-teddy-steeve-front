import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { HttpService } from '../../../services/http/http.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sample-page',
  templateUrl: './sample-page.component.html',
})
export class AppSamplePageComponent implements OnInit {
  
  servicename: string = "beauty/users";
  displayedColumns: string[] = ['nom', 'email', 'roleId', 'estactif','action'];
  dataSource = new MatTableDataSource<any>();
  total: number=0;
  totalPages: number=0;
  page: number = 1;
  size: number= 10;

  formData = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private httpservice: HttpService) { }

  ngOnInit(): void {
    this.loadData();
   
  }
  onPageChange(pageEvent: any): void {
    this.page = pageEvent.pageIndex + 1;
    this.size = pageEvent.pageSize;
    this.loadData();
  }
  onSubmit(): void{
    console.log('Formulaire soumis :', this.formData);
    if(this.formData.valid){
      console.log(this.formData.value)
      this. insertData();
    }
   
  }
  async insertData(){
    (await this.httpservice.postbod(this.servicename, this.formData.value)).subscribe(()=>{
      this.loadData();
    });
  }

  loadData(){
    this.httpservice.fetchdata(this.servicename,this.page,this.size).subscribe((data: any) =>{
      if(data){
        this.dataSource=data.users;
        this.total = data.total;
        this.totalPages = data.totalPages;
        this.page = data.page;
        this.size = data.limit;
      }
      console.log(data);
    },(error: any) =>{
        console.error('An error has occured:',error);
    });
  }

  updateuser(element: any): void{
    console.log('Modifier l\'utilisateur :', element);
  }
  deleteuser(element: any): void{
    console.log('Supprimer l\'utilisateur :', element);
  }

  getUsersFromAPI(){
    this.httpservice.getUsers().subscribe((data: any) =>{
      if(data){
        this.dataSource=data.users;
        // this.total = data.total;
        // this.totalPages = data.totalPages;
        // this.page = data.page;
        // this.size = data.limit;
      }
      console.log(data);
    },(error: any) =>{
        console.error('An error has occured:',error);
    });
  }
}

