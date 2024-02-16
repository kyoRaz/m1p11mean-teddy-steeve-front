import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { HttpService } from '../../../services/http/http.service';
import { MatPaginator } from '@angular/material/paginator';

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

  formData = {
    nom: '',
    prenom: '',
    email: ''
  };

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
    this.httpservice.postbod(this.servicename,this.formData);
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

