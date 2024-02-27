import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpService } from '../../../services/http/http.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog,MatDialogActions,MatDialogClose,MatDialogContent,MatDialogTitle} from '@angular/material/dialog';
import { AppDialogComponent } from '../dialog/dialog.component';
import { LoaderService } from 'src/app/services/loader/loader.service';

// ecommerce card
interface productcards {
  id: number;
  imgSrc: string;
  title: string;
  price: string;
  rprice: string;
}
@Component({
  selector: 'app-tache',
  templateUrl: './takerdv.component.html',
})
export class AppTakerdvComponent implements OnInit{


  servicename: string = "services";
  servicenameRDV: string = "rdvs/config";
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  today = new Date().toISOString().slice(0, 10);
  formData = new FormGroup({
    _id: new FormControl(''),
    date: new FormControl('', [Validators.required]),
    heure: new FormControl(''),
  });
  rdv: any = '';
  firstFormGroup = this.formData;
  secondFormGroup :any  ;
  isLinear = false;
  isRDV = false;
  dataSource: any;
  listrdv: any = {
    dateRdv:'',
    heureRdv:'',
    listDetails:[]
  }

  constructor(private httpservice: HttpService,public dialog: MatDialog
    ,public loader: LoaderService) { }

  ngOnInit(): void {
    this.loadData()
  }
  openDialog(service: any) {
    this.dialog.open(AppDialogComponent,{
      data: {date: this.rdv,service: service,list: this.listrdv.listDetails,isfull :this.isRDV}
    });
  }
  loadData(){
    this.httpservice.get(this.servicename).subscribe((data: any) =>{
      if(data){
        this.dataSource=data.resultat;
        this.formData.reset();
      }
      console.log(data);
    },(error: any) =>{
        console.error('An error has occured:',error);
    });
  }
  async deal(stepper: any){
    (await this.httpservice.postbod(this.servicenameRDV, this.listrdv)).subscribe(()=>{
      stepper.reset();
    });
  }
  onSubmit(){
    if(this.formData.valid){
      
      this.rdv = this.formData.get('date')?.value;
      this.formData.reset();
      this.listrdv.dateRdv=this.rdv.split('T')[0];
      this.listrdv.heureRdv=this.rdv.split('T')[1]+":00";
      console.log(this.listrdv);
      this.scrollToSection('rdv');
    }

  }
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  isFormulaireModifie(): boolean {
    return this.formData.dirty;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
