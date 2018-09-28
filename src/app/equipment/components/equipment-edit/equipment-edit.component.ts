import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { map } from 'rxjs/operators';
import { Equipment } from '../../../models/equipment';
import { ChoiceService } from '../../../services/choice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Choice } from '../../../models/choice';
import { EquipmentService } from '../../../services/equipment.service';
import { switchMap } from 'rxjs/operators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-equipment-edit',
  templateUrl: './equipment-edit.component.html',
  styleUrls: ['./equipment-edit.component.scss']
})
export class EquipmentEditComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public equipment: Equipment,
    private dialogRef: MatDialogRef<EquipmentEditComponent>,
    private service: EquipmentService,
    private choiceService: ChoiceService,
    private login: LoginService,
    private sanitizer: DomSanitizer
  ) { }

  @ViewChild('fileInput')
  fileInput;

  imageUrl: SafeUrl;
  loaded = false;
  typeError = false;

  choices: Observable<Choice[]>;

  equipmentForm = new FormGroup({
    'code': new FormControl(this.equipment.code, [
      Validators.required
    ]),
    'title': new FormControl(this.equipment.title, [
      Validators.required
    ]),
    'type': new FormControl('', [
      Validators.required
    ]),
    'is_epc': new FormControl(this.equipment.is_epc, [
      Validators.required
    ]),
    'training': new FormControl(this.equipment.training, [
      Validators.required
    ])
  });

  ngOnInit() {

    this.service.downloadImage(this.equipment.ID).subscribe(
      blob => this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob))
    );

    this.choices = this.choiceService.choices.pipe(
      map(choices => choices.filter(choice => choice.category === 'EQUIPMENT_TYPE'))
    );

    this.choices.subscribe(
      choices => {
        if  (choices.length > 0) {
          this.equipmentForm.get('type').setValue(choices.find(choice => choice.ID === this.equipment.type.__KEY).ID);
        }
      }
    );
    this.choiceService.loadAll();
  }

  editEquipment() {
    const file = this.fileInput.nativeElement;
    const fileToUpload = file.files[0];
    const input = new FormData();
    input.append('file', fileToUpload);

    const update = this.loaded ? this.service.upload(input).pipe(
      switchMap(url => this.service.updateEquipment({ ...this.equipmentForm.value, ID: this.equipment.ID, url }))
    ) : this.service.updateEquipment({ ...this.equipmentForm.value, ID: this.equipment.ID, url: '' });

    update.subscribe(
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
      if (file.files[0].type === 'image/jpeg') {
        this.typeError = false;
        const reader = new FileReader();
        reader.addEventListener('load', () => this.imageUrl = reader.result);
        reader.readAsDataURL(file.files[0]);
      } else {
        this.typeError = true;
      }
    }
  }

}
