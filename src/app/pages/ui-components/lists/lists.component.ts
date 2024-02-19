import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';

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

  constructor(private httpservice: HttpService) {}
  
  ngOnInit(): void {
    this.loadData();
   
  }
  capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
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
