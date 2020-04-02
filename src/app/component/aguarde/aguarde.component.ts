import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-aguarde',
  templateUrl: './aguarde.component.html',
  styleUrls: ['./aguarde.component.css']
})
export class AguardeComponent {

  constructor(
    public dialogRef: MatDialogRef<AguardeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String) { }
}
