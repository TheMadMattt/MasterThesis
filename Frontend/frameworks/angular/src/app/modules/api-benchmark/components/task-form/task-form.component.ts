import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Task } from '@shared/models/Task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['../form-styles.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  isEditing = false;

  constructor(public dialogRef: MatDialogRef<TaskFormComponent>,
              @Inject(MAT_DIALOG_DATA) public task: Task,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.isEditing = this.task.title !== '';
    this.taskForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      completed: [false, Validators.required]
    });

    this.taskForm.patchValue(this.task);
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const taskRaw = this.taskForm.getRawValue();
    this.task.title = taskRaw.title;
    this.task.description = taskRaw.description;

    this.dialogRef.close(this.task);
  }

  errorHandling = (control: string, error: string) => {
    return this.taskForm.controls[control].hasError(error);
  }
}
