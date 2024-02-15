import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { HttpService } from '../../../services/http/http.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-sample-page',
  templateUrl: './sample-page.component.html',
})
export class AppSamplePageComponent implements OnInit {
  
  displayedColumns: string[] = ['nom', 'email', 'roleId', 'estactif'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private httpservice: HttpService) { }

  ngOnInit(): void {
    this.getUsersFromAPI();
    this.dataSource.paginator= this.paginator ;
  }

  getUsersFromAPI(){
    this.httpservice.getUsers().subscribe((data: any) =>{
      if(data){
        this.dataSource=data.users;
        console.log(this.dataSource);
      }
      console.log(data);
    },(error: any) =>{
        console.error('An error has occured:',error);
    });
  }
}

