import { Component, OnInit } from '@angular/core';
import { ParametroData } from 'src/app/model/parametroData.model';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  parametro: ParametroData;

  constructor(private api: ApiService) { }

  ngOnInit() {    
  }

}
