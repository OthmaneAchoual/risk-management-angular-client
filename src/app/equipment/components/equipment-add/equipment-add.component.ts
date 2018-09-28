import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChoiceService } from '../../../services/choice.service';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Choice } from '../../../models/choice';
import { EquipmentService } from '../../../services/equipment.service';
import { MatDialogRef } from '@angular/material';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-equipment-add',
  templateUrl: './equipment-add.component.html',
  styleUrls: ['./equipment-add.component.scss']
})
export class EquipmentAddComponent implements OnInit {

  choices: Observable<Choice[]>;

  @ViewChild('fileInput')
  fileInput;

  imageUrl = '';
  loaded = false;
  typeError = false;

  constructor(
    private dialogRef: MatDialogRef<EquipmentAddComponent>,
    private choiceService: ChoiceService,
    private login: LoginService,
    private service: EquipmentService
  ) { }

  equipmentForm = new FormGroup({
    'code': new FormControl('', [
      Validators.required
    ]),
    'title': new FormControl('', [
      Validators.required
    ]),
    'type': new FormControl('', [
      Validators.required
    ]),
    'epc': new FormControl(false, [
      Validators.required
    ]),
    'training': new FormControl(false, [
      Validators.required
    ])
  });

  ngOnInit() {
    this.choices = this.choiceService.choices.pipe(
      map(choices => choices.filter(choice => choice.category === 'EQUIPMENT_TYPE'))
    );
    this.choiceService.loadAll();
  }

  addEquipment() {
    const file = this.fileInput.nativeElement;
    const fileToUpload = file.files[0];
    const input = new FormData();
    input.append('file', fileToUpload);
    this.service.upload(input).pipe(
      switchMap(imagePath => {
        const object = { ...this.equipmentForm.value, imagePath };
        return this.service.addEquipment(object);
      })
    ).subscribe(
      res => this.dialogRef.close(res),
      err => {
        if (err.status === 401) {
          this.login.updateSession();
        }
        this.dialogRef.close(null);
      }
    );
  }

  cancel() {
    this.dialogRef.close(null);
  }

  addFile() {
    const file = this.fileInput.nativeElement;
    if (file.files && file.files[0]) {
      this.loaded = true;
      console.log('loaded');
      if (file.files[0].type === 'image/jpeg') {
        this.typeError = false;
        const reader = new FileReader();
        reader.addEventListener('load', () => this.imageUrl = <string>reader.result);
        reader.readAsDataURL(file.files[0]);
      } else {
        this.typeError = true;
      }
    }
  }

}
