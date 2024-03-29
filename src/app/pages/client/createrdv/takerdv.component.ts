import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpService } from '../../../services/http/http.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { AppDialogComponent } from '../dialog/dialog.component';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { AlertService } from 'src/app/services/alert/alert.service';

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
export class AppTakerdvComponent implements OnInit {


  servicename: string = "services";
  servicenameRDV: string = "rdvs/config";
  today = new Date().toISOString().slice(0, 10);
  formData = new FormGroup({
    _id: new FormControl(''),
    date: new FormControl('', [Validators.required]),
    heure: new FormControl(''),
  });
  rdv: any = '';
  firstFormGroup = this.formData;
  secondFormGroup: any;
  isLinear = false;
  isRDV = false;
  dataSource: any;
  listrdv: any = {
    dateRdv: '',
    heureRdv: '',
    listDetails: []
  }

  constructor(private httpservice: HttpService, public dialog: MatDialog
    , public loader: LoaderService,
    public sweet: AlertService) { }

  ngOnInit(): void {
    this.loadData()
  }
  openDialog(service: any) {
    this.dialog.open(AppDialogComponent, {
      data: { date: this.rdv, service: service, list: this.listrdv.listDetails, isfull: this.isRDV }
    });
  }
  loadData() {
    this.httpservice.get(this.servicename).subscribe((data: any) => {
      if (data) {
        this.dataSource = data.resultat;
        this.formData.reset();
      }
      console.log(data);
    }, (error: any) => {
      console.error('An error has occured:', error);
    });
  }
  async deal(stepper: any) {
    (await this.httpservice.postbod(this.servicenameRDV, this.listrdv)).subscribe(
      (response) => {
        this.sweet.showSuccessAlert("préférence enregistré");
        stepper.reset();
      },
      (error) => {
        this.sweet.showErrorAlert("Erreur lors  de la transaction");
      }
    );;
  }
  onSubmit() {
    if (this.formData.valid) {

      this.rdv = this.formData.get('date')?.value;
      this.formData.reset();
      this.listrdv.dateRdv = this.rdv.split('T')[0];
      this.listrdv.heureRdv = this.rdv.split('T')[1] + ":00";
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



}
