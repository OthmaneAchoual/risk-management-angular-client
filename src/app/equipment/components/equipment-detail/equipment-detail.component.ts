import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipment } from '../../../models/equipment';
import { EquipmentService } from '../../../services/equipment.service';
import { Choice } from '../../../models/choice';
import { ChoiceService } from '../../../services/choice.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.scss']
})
export class EquipmentDetailComponent implements OnInit {

  equipment$: Observable<Equipment>;
  type$: Observable<Choice>;

  imageUrl: SafeUrl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public equipment: Equipment,
    private service: EquipmentService,
    private choiceService: ChoiceService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {

    this.service.downloadImage(this.equipment.ID).subscribe(
      blob => this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob))
    );
  }

}
