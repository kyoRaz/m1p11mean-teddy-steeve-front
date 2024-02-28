import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { AppTakerdvComponent } from '../createrdv/takerdv.component';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html'
})
export class AppDialogComponent implements OnInit {

  servicename2 = 'horaires/dispoUserWithNoService';
  dataSource: any;
  paramsdispoemploye = {
    debutService: '',
    finService: '',
    date: ''
  }
  detailRdv = {
    debutService: '',
    finService: '',
    idEmploye: '',
    idService: ''
  }

  constructor(private httpservice: HttpService,
    public loader: LoaderService,
    public dialogRef: MatDialogRef<AppTakerdvComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.setparams(this.data, this.data.service);
    this.loadData();
  }
  loadData() {

    const url = this.servicename2 + `?debutService=${this.paramsdispoemploye.debutService}&finService=${this.paramsdispoemploye.finService}&date=${this.paramsdispoemploye.date}`;
    this.httpservice.get(url).subscribe((data) => {
      if (data) {
        console.log(data);
        this.dataSource = data.resultat
      }
    })
  }
  addcard(employe: any, service: any) {
    this.detailRdv.idEmploye = employe;
    this.detailRdv.idService = service;
    console.log(this.data.list);
    this.data.list.push(this.detailRdv);
    this.data.isfull=true;
    this.dialogRef.close();
  }
  setparams(data: any, service: any) {
    const strday = data.date;
    const time = data.date.split('T')[1];
    const duree = service.delai;
    const hdure = duree.split(':')[0];
    const mdure = duree.split(':')[1];
    let day :any;
    if(this.data.list.length>0){
      const newbegin = this.data.list[this.data.list.length-1].finService;
      
      day=new Date();
      day.setHours(newbegin.split(':')[0],newbegin.split(':')[1]);
      console.log(day);
      this.detailRdv.debutService = this.data.list[this.data.list.length-1].finService;
    }else{
      this.detailRdv.debutService = time;
      day=new Date(strday);
    }
    
    this.paramsdispoemploye.date = strday.split('T')[0];
    this.paramsdispoemploye.debutService = this.detailRdv.debutService;
    day.setHours(day.getHours() + parseInt(hdure), day.getMinutes() + parseInt(mdure));
    console.log(day)
    let heurefinal = '' + day.getHours();
    if (day.getHours() < 10) {
      heurefinal = '0' + heurefinal ;
      if(day.getMinutes()<10){
        this.detailRdv.finService = heurefinal+ ':0' + day.getMinutes();
      }else{ 
        this.detailRdv.finService = heurefinal+ ':' + day.getMinutes();
      }
    }else{
      if(day.getMinutes()<10){
        this.detailRdv.finService = heurefinal+ ':0' + day.getMinutes();
      }else{ 
        this.detailRdv.finService = heurefinal+ ':' + day.getMinutes();
      }
    }
    this.paramsdispoemploye.finService = heurefinal + ':' + day.getMinutes();

  }


}
