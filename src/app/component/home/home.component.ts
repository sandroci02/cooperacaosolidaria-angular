import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: ApiService, private route: ActivatedRoute,
    private router: Router) { }

  campanhas: any;
  loading: boolean;

  ngOnInit() {
    this.loading = true;
    this.carregarCamanhas();
  }

  carregarCamanhas() {
    this.service.get("campaign/find/all", {}).subscribe(
      data => {
        //console.log(data);
        this.campanhas = data;
        this.loading = false;
      },
      er => {
        console.log("erro", er.error.error)
        this.loading = false;
      });

    //campaign/find/all
  }

  ver(detalhe) {
    //console.log(JSON.stringify(detalhe))
    localStorage.setItem("campanha",JSON.stringify(detalhe))
    this.router.navigate(["/detalhe"]);
  }
}
