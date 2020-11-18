import { IData } from './../services/app.model';
import { AppService } from './../services/app.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(8)]],
      descreption: [null],
      dueDate: [this.datePipe.transform(new Date(), 'yyyy-MM-dd')],
      piority: ['normal'],
      isOpenDetail: [false],
      id: [this.appService.genId()]
    });
  }

  submit() {
    if (this.form.invalid) { return; }
    this.appService.createData(this.form.value);
    this.router.navigateByUrl('');
  }

}
