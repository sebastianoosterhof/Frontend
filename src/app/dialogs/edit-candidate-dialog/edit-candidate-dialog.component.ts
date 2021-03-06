import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MdDialogRef, MdDialog, MD_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

import { ExamLine } from '../../interfaces/exam-line';
import { CandidateStatus } from '../../infrastructure/enums/candidate-status';

import { ExamApplicationService } from '../../services/exam-application.service';

import { CandidatesComponent } from '../../pages/candidates/candidates.component';


@Component({
  selector: 'edit-candidate-dialog',
  templateUrl: './edit-candidate-dialog.component.html',
  styleUrls: ['./edit-candidate-dialog.component.scss']
})
export class EditCandidateDialogComponent implements OnInit {
  selectedCandidate: ExamLine[];

  creboValue: string;
  educationValue: string;
  statusValue: string;
  crebo_id: number;


  protected confirmationDialogComponent = ConfirmationDialogComponent;

  protected candidatesComponent: CandidatesComponent;

  @Input()
  checked;

  constructor( @Optional() @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<EditCandidateDialogComponent>,
    public dialog: MdDialog,
    private examApplicationService: ExamApplicationService) { }

  /*
  * @function: public ngOnInit()
  * @description: this is the first function that will be executed. It calls functions that has to be executed on pageload.
  * @params: none
  * @returns: none
  * @date: 31-05-2017
  */
  public ngOnInit() {
    this.selectedCandidate = this.data;
    this.initializeData();
  }


  /*
  * @function: public openConfirmationDialog()
  * @description: this is the first function that will be executed. It calls functions that has to be executed on pageload.
  * @params: none
  * @returns: none
  * @date: 30-05-2017
  */
  protected openConfirmationDialog() {
    const dialogRef = this.dialog.open(this.confirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.examApplicationService.deleteExamLines(this.selectedCandidate['id']).subscribe(
          res => console.log(res));
        this.dialog.closeAll();
      }
    });
  }

  /*
  * @function: public onExitChange()
  * @description: checks for changes on the toggle slider.
  * @params: none
  * @returns: none
  * @date: 30-05-2017
  */
  protected onExitChanged(value: string) {
    this.statusValue = value;
  }

  /*
  * @function: public onEducationChanged()
  * @description: changes education to corresponding change in the education input.
  * @params: educationValue
  * @returns: none
  * @date: 01-06-2017
  */
  protected onEducationChanged(educationValue: string) {
    this.educationValue = educationValue;
    const applicationdeveloper = 'Applicatieontwikkelaar';
    const mediadeveloper = 'Mediadeveloper';
    const adCrebo = '95311';
    const mdCrebo = '95213';

    // Applicationdeveloper
    if (this.educationValue === applicationdeveloper) {
      this.creboValue = adCrebo;
      this.crebo_id = 1;
    }

    // Mediadeveloper
    if (this.educationValue === mediadeveloper) {
      this.creboValue = mdCrebo;
      this.crebo_id = 2;
    }

  }

  /*
  * @function: public onCreboChanged()
  * @description: changes crebo to corresponding change in the crebo input.
  * @params: creboValue
  * @returns: none
  * @date: 01-06-2017
  */
  protected onCreboChanged(creboValue: string) {
    this.creboValue = creboValue;
    const applicationdeveloper = 'Applicatieontwikkelaar';
    const mediadeveloper = 'Mediadeveloper';
    const adCrebo = '95311';
    const mdCrebo = '95213';

    // Applicationdeveloper
    if (this.creboValue === adCrebo) {
      this.crebo_id = 1;
      this.educationValue = applicationdeveloper;
    }

    // Mediadeveloper
    if (this.creboValue === mdCrebo) {
      this.crebo_id = 2;
      this.educationValue = mediadeveloper;
    }
  }

  /*
  * @function: public setChanges()
  * @description: sets changes to the examApplicationService.
  * @params: none
  * @returns: none
  * @date: 06-06-2017
  */
  protected setChanges() {
    // Exit
    if (this.statusValue) {
      this.selectedCandidate['status'] = 'exit';
    }
    // Candidate
    if (!this.statusValue) {
      this.selectedCandidate['status'] = 'candidate';
    }

    this.selectedCandidate['crebo_id'] = this.crebo_id;
    this.selectedCandidate['education'] = this.educationValue;
    this.selectedCandidate['crebo'] = this.creboValue;

    this.examApplicationService.setExamLines(this.selectedCandidate).subscribe(
      data => {
        // refresh the list
        // this.examApplicationService.getExamLines();
        this.candidatesComponent.getCandidates();
        return true;
      },
      error => {
        return Observable.throw(error);
      }
    );
  }


  /*
  * @function: private initializeData()
  * @description: initializes the data from this.data, sets exit toggle based on selectedCandidate , sets education/crebo.
  * @params: none
  * @returns: none
  * @date: 01-06-2017
  */
  private initializeData() {
    if (this.selectedCandidate['status'] === 'exit') {
      this.checked = true;
    }
    else {
      this.checked = false;
    }

    // Applicationdeveloper
    if (this.selectedCandidate['education'] === 'Applicatieontwikkelaar') {
      this.creboValue = '95311';
      this.crebo_id = 1;
    }
    if (this.selectedCandidate['crebo'] === '95311') {
      this.educationValue = 'Applicatieontwikkelaar';
      this.crebo_id = 1;
    }

    // Mediadeveloper
    if (this.selectedCandidate['education'] === 'Mediadeveloper') {
      this.creboValue = '95213';
      this.crebo_id = 2;
    }
    if (this.selectedCandidate['crebo'] === '95213') {
      this.educationValue = 'Mediadeveloper';
      this.crebo_id = 2;
    }

  }

}
