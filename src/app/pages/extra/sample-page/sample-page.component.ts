import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { HttpService } from '../../../services/http/http.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sample-page',
  templateUrl: './sample-page.component.html',
})
export class AppSamplePageComponent implements OnInit {
  
  servicename: string = "beauty/users/";
  isupdate: boolean = false;
  displayedColumns: string[] = ['nom', 'email', 'roleId', 'estactif','action'];
  dataSource = new MatTableDataSource<any>();
  total: number=0;
  totalPages: number=0;
  page: number = 1;
  size: number = 10;
  filtre: string = '';

  formData = new FormGroup({
    _id: new FormControl(''),
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
    (await this.httpservice.postbod(this.servicename+'employe', this.formData.value)).subscribe(()=>{
      this.loadData();
    });
  }

  loadData(){
    this.httpservice.fetchdata(this.servicename+'employes',this.page,this.size,this.filtre).subscribe((data: any) =>{
      if(data){
        this.dataSource=data.users;
        this.total = data.total;
        this.totalPages = data.totalPages;
        this.page = data.page;
        this.size = data.limit;
      }
      this.formData.reset();
    },(error: any) =>{
        console.error('An error has occured:',error);
    });
  }

  scrollToSection(sectionId: string, data: any) {
    const element = document.getElementById(sectionId);
    this.isupdate = true;
    if (element) {
      if(data){
        this.formData.setValue({
          _id: data._id,
          nom: data.nom,
          prenom: data.prenom,
          email: data.email
        });
      }
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  async updateData(){  
    const id  = this.formData.get('_id')?.value;
    console.log(id);
    
    const url = this.servicename+`/${id}`;
    (await this.httpservice.putData(url, this.formData.value)).subscribe(()=>{
      this.isupdate = false;
      this.loadData();
    });
  }
  async deleteuser(element: any): Promise<void>{
    console.log('Supprimer l\'utilisateur :', element);
    (await this.httpservice.deleteData(this.servicename+element._id)).subscribe(()=>{
      this.loadData();
    });
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

