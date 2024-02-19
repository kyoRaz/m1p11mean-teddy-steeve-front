import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
})
export class AppListsComponent implements OnInit {

  servicename: string = "beauty/services";
  dataSource : any;
  total: number=0;
  totalPages: number=0; 
  page: number = 1;
  size: number= 10;
  formData= new FormGroup({
    nom:new FormControl('', [Validators.required]),
    delai:new FormControl('', [Validators.required,Validators.pattern("([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]")]),
    prix:new FormControl('', [Validators.required, Validators.min(0)]),
    commission:new FormControl('', [Validators.required, Validators.min(0)])
  });

  constructor(private httpservice: HttpService,public dialog: MatDialog) {}
  
  ngOnInit(): void {
    this.loadData();
  }
  
  capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  openDialogy(){
    
  }
  onSubmit(): void{
    console.log('Formulaire soumis :', this.formData);
    if(this.formData.valid){
      this.insertData();
    }
  }
  async insertData(){
    (await this.httpservice.postbod(this.servicename, this.formData.value)).subscribe(()=>{
      this.loadData();
    });
  }
  
  async delete(id: any){
    // console.log(id);
    const url = this.servicename+`/${id}`;
    (await this.httpservice.deleteData(url)).subscribe(()=>{
      this.loadData();
    });
  }
  async updateData(data: any){

    console.log(data);
    
    // const id  = data._id;
    // const url = this.servicename+`/${id}`;
    // (await this.httpservice.putData(url, this.formData.value)).subscribe(()=>{
    //   this.loadData();
    // });
  }
  loadData(){
    this.httpservice.get(this.servicename).subscribe((data: any) =>{
      if(data){
        this.dataSource=data.resultat;
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
