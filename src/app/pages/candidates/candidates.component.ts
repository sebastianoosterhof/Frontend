// Angular
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { MdDialog } from '@angular/material';

// Services
import { ExamApplicationService } from '../../services/exam-application.service';

// Controllers
import { ExamApplicationController } from '../../controllers/exam-application.controller';

// Dialogs
import { AddCandidateDialogComponent } from '../../dialogs/add-candidate-dialog/add-candidate-dialog.component';
import { AddRemarksDialogComponent } from '../../dialogs/add-remarks-dialog/add-remarks-dialog.component';
import { RemarksDialogComponent } from '../../dialogs/remarks-dialog/remarks-dialog.component';
import { EditCandidateDialogComponent } from '../../dialogs/edit-candidate-dialog/edit-candidate-dialog.component';

// Interfaces
import { ExamLine } from '../../interfaces/exam-line';
import { Exam } from '../../interfaces/exam';


@Component({
  selector: 'candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {
  title = 'Kandidaten';
  candidates: ExamLine[];
  exams: Exam[];

  examLength: number;

  selectedCandidate: ExamLine;
  HBEOptionsChecked = [];
  PVBOptionsChecked = [];

  selectedOption: string;
  selectedPVB: string;
  selectedOG: string;
  pvbBGColor: string;
  ogBGColor: string;


  private statusColorUndefined = '#fff';
  private statusColorYes = '#81C784';
  private statusColorNo = '#EF9A9A';
  private statusColorRequested = '#81C784';
  private statusColorPlanned = '#4DB6AC';
  private statusColorAchieved = '#81D4FA';
  private statusColorSlidingThrough = '#FFF176';
  private statusColorDeterminationList = '#64B5F6';


  pvbs = [
    { value: '0', viewValue: 'Kies...' },
    { value: '1', viewValue: 'Nee' },
    { value: '2', viewValue: 'Ja' },
    { value: '3', viewValue: 'Vaststellingslijst' }
  ];

  ogs = [
    { value: '0', viewValue: 'Kies...' },
    { value: '1', viewValue: 'Aangevraagd' },
    { value: '2', viewValue: 'Ingepland' },
    { value: '3', viewValue: 'Gehaald' },
    { value: '4', viewValue: 'Doorschuiven' }
  ];

  HBEChecks = [
    'checked1',
    'checked2',
    'checked3',
    'checked4',
    'checked5',
    'checked6',
    'checked7'
  ];

  PVBChecks = [
    'checked1',
    'checked2',
    'checked3',
    'checked4'
  ];

  HBEChecksMap = [
    { checked1: false },
    { checked2: false },
    { checked3: false },
    { checked4: false },
    { checked5: false },
    { checked6: false },
    { checked7: false }
  ];

  PVBChecksMap = [
    { checked1: false },
    { checked2: false },
    { checked3: false },
    { checked4: false }
  ];

  protected addCandidateDialogComponent = AddCandidateDialogComponent;

  protected editCandidateDialogComponent = EditCandidateDialogComponent;

  protected addRemarksDialogComponent = AddRemarksDialogComponent;

  protected remarksDialogComponent = RemarksDialogComponent;


  constructor(
    private router: Router,
    private http: Http,
    private dialog: MdDialog,
    private examApplicationService: ExamApplicationService,
    private examApplicationController: ExamApplicationController) {
  }


  /*
  * @function: public ngOnInit()
  * @description: this is the first function that will be executed. It calls functions that has to be executed on pageload.
  * @params: none
  * @returns: none
  * @date: 22-05-2017
  */
  public ngOnInit() {
    this.selectedPVB = '0';
    this.selectedOG = '0';
    this.getCandidates();
    this.setExams();
  }

  /*
  * @function: public setExams()
  * @description: sets exams based on data from database..
  * @params: none
  * @returns: none
  * @date: 12-06-2017
  */
  public setExams() {
    for (let i = 0; i < this.HBEChecks.length; i++) {
      this.HBEChecksMap[this.HBEChecks[i]] = true;
    }

    for (let i = 0; i < this.PVBChecks.length; i++) {
      this.PVBChecksMap[this.PVBChecks[i]] = true;
    }
  }

  /*
  * @function: public setHBE()
  * @description: sets WPT/HBE checks after change.
  * @params: lineId, check, event
  * @returns: none
  * @date: 12-06-2017
  */
  public setHBE(lineId, check, event) {
    this.HBEChecks[check] = event.checked;

    const checked1 = this.HBEChecks['checked1'];
    const checked2 = this.HBEChecks['checked2'];
    const checked3 = this.HBEChecks['checked3'];
    const checked4 = this.HBEChecks['checked4'];
    const checked5 = this.HBEChecks['checked5'];
    const checked6 = this.HBEChecks['checked6'];
    const checked7 = this.HBEChecks['checked7'];


    // this.updateHBEChecks();
  }

  /*
  * @function: public setPVB()
  * @description: sets PVB checks after change.
  * @params: lineId, check, event
  * @returns: none
  * @date: 12-06-2017
  */
  public setPVB(lineId, check, event) {
    this.PVBChecks[check] = event.checked;

    const checked1 = this.PVBChecks['checked1'];
    const checked2 = this.PVBChecks['checked2'];
    const checked3 = this.PVBChecks['checked3'];
    const checked4 = this.PVBChecks['checked4'];
    const checked5 = this.PVBChecks['checked5'];
    const checked6 = this.PVBChecks['checked6'];
    const checked7 = this.PVBChecks['checked7'];


    // this.updatePVBChecks();
  }

  // public updateHBEChecks() {
  //   for (let i in this.HBEChecksMap) {
  //     if (this.HBEChecksMap[i]) {
  //       this.HBEOptionsChecked.push(i);
  //     }
  //   }
  //   this.HBEChecks = this.HBEOptionsChecked;
  //   this.HBEOptionsChecked = [];
  // }

  // public updatePVBChecks() {
  //   for (let i in this.PVBChecksMap) {
  //     if (this.PVBChecksMap[i]) {
  //       this.PVBOptionsChecked.push(i);
  //     }
  //   }
  //   this.PVBChecks = this.PVBOptionsChecked;
  //   this.PVBOptionsChecked = [];
  // }


  /*
  * @function: public getCandidates()
  * @description: gets candidates from the ExamApplicationService through subscription.
  * @params: none
  * @returns: none
  * @date: 27-05-2017
  */
  public getCandidates() {
    this.examApplicationService.getExamLines().subscribe(result => {
      this.candidates = result;
    });
  }


  /*
  * @function: protected getExams()
  * @description: gets exams from the ExamApplicationService through subscription.
  * @params: none
  * @returns: none
  * @date: 27-05-2017
  */
  public getExams() {
    this.examApplicationService.getExams().subscribe(result => {
      this.exams = result;
    },
      err => console.error(err),
      () => this.setExams());
  }

  /*
  * @function: protected openEditCandidateDialog()
  * @description: opens the EditCandidateDialog. After the dialog has been close, the result will be fetched through subscription.
  * @params: id
  * @returns: none
  * @date: 30-05-2017
  */
  protected openEditCandidateDialog(id) {
    this.candidates.forEach(candidate => {
      if (candidate.id === id) {
        this.selectedCandidate = candidate;
      };
    });
    const dialogRef = this.dialog.open(this.editCandidateDialogComponent, { data: this.selectedCandidate });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      this.examApplicationService.getExamLines();
    });
  }

  /*
  * @function: protected openAddRemarkDialog()
  * @description: opens the AddRemarkDialog. After the dialog has been close, the result will be fetched through subscription.
  * @params: c
  * @returns: none
  * @date: 22-05-2017
  */
  protected openAddRemarkDialog(c) {
    this.candidates.forEach(candidate => {
      const line = c + 1;
      if (candidate.id === line) {
        this.selectedCandidate = candidate;
      };
    });

    const dialogRef = this.dialog.open(this.addRemarksDialogComponent, { data: this.selectedCandidate });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

  /*
  * @function: protected openRemarksDialog()
  * @description: opens the EditCandidateDialog.
  * @params: c
  * @returns: none
  * @date: 22-05-2017
  */
  protected openRemarksDialog(c) {
    this.candidates.forEach(candidate => {
      const line = c + 1;
      if (candidate.id === line) {
        this.selectedCandidate = candidate;
      };
    });

    const dialogRef = this.dialog.open(this.remarksDialogComponent, { data: this.selectedCandidate });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }



  protected onPVBChanged(value: string) {
    if (this.selectedPVB === '0') {
      this.pvbBGColor = this.statusColorUndefined;
    }
    if (this.selectedPVB === '1') {
      this.pvbBGColor = this.statusColorNo;
    }
    if (this.selectedPVB === '2') {
      this.pvbBGColor = this.statusColorYes;
    }
    if (this.selectedPVB === '3') {
      this.pvbBGColor = this.statusColorAchieved;
    }
    if (this.selectedPVB === '4') {
      this.pvbBGColor = this.statusColorDeterminationList;
    }
  }

  protected onOGChanged(value: string) {
    if (this.selectedOG === '0') {
      this.ogBGColor = this.statusColorUndefined;
    }
    if (this.selectedOG === '1') {
      this.ogBGColor = this.statusColorRequested;
    }
    if (this.selectedOG === '2') {
      this.ogBGColor = this.statusColorPlanned;
    }
    if (this.selectedOG === '3') {
      this.ogBGColor = this.statusColorAchieved;
    }
    if (this.selectedOG === '4') {
      this.ogBGColor = this.statusColorSlidingThrough;
    }
  }


}
