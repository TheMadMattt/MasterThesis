import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Post} from '@modules/benchmarks/models/Post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  postForm!: FormGroup;
  isEditing = false;

  constructor(public dialogRef: MatDialogRef<PostFormComponent>,
              @Inject(MAT_DIALOG_DATA) public post: Post,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.isEditing = this.post.title !== '';
    this.postForm = this.fb.group({
      title: [null, Validators.required],
      body: [null, Validators.required]
    });

    this.postForm.patchValue(this.post);
  }

  onSubmit(): void {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }


    const postRaw = this.postForm.getRawValue();
    this.post.title = postRaw.title;
    this.post.body = postRaw.body;

    this.dialogRef.close({ post: this.post});
  }

  errorHandling = (control: string, error: string) => {
    return this.postForm.controls[control].hasError(error);
  }
}
