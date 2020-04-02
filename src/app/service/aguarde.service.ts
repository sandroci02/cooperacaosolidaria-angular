import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AguardeComponent } from '../component/aguarde/aguarde.component';



@Injectable({
  providedIn: 'root'
})
export class AguardeService {

  constructor(public dialog: MatDialog) { }

  aguarde() {
    const aguarde = this.dialog.open(AguardeComponent, {
      width: '150px',
      height: '150px',
      disableClose: true,
      data: {}
    });
    return aguarde;
  }
}
