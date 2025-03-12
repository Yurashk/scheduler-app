import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-calendar-time-slots-modal',
  imports: [CommonModule, FormsModule, MatButtonModule,MatFormFieldModule,MatInputModule,MatDialogModule,ReactiveFormsModule],
  templateUrl: './calendar-time-slots-modal.component.html',
  styleUrl: './calendar-time-slots-modal.component.scss'
})
export class CalendarTimeSlotsModalComponent {
  eventForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CalendarTimeSlotsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.eventForm = this.fb.group({
      title: [data.task?.title || '', Validators.required],
      description: [data.task?.description || '', Validators.required]
    });
  }

  save() {
    if (this.eventForm.invalid) return;
    this.dialogRef.close(this.eventForm.value);
  }

  close() {
    this.dialogRef.close();
  }
}