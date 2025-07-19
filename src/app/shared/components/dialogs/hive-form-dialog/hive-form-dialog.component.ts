import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hive } from '../../../../models/hive/hive.model';

@Component({
  selector: 'app-hive-form-dialog',
  templateUrl: './hive-form-dialog.component.html',
  styleUrls: ['./hive-form-dialog.component.scss']
})
export class HiveFormDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<HiveFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hive | null
  ) {
    this.form = this.fb.group({
      name: [data?.name || '', Validators.required],
      type: [data?.type || '', Validators.required],
      status: [data?.status || 'Active', Validators.required],
      honeyAmount: [data?.honeyAmount || null]
    });
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
