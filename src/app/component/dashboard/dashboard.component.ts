import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private api: ApiService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  irCampanha() {
    this.router.navigate(["/cadastro-campanha"]);
  }
}
