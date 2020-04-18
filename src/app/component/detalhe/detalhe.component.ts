import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  links = []
  detalhe: any
  ngOnInit() {

    this.detalhe = JSON.parse(localStorage.getItem("campanha"));
    if(this.detalhe == null ){
      this.router.navigate(["/home"]);
      return;
    }

    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  ir(site) {    
    window.open(site, "_blank");
  }

  
  cortaPlavra(palavra,max){
    if(palavra === undefined || palavra === null){
      return "";
    }
    let palavras = palavra.split(" ");

    let retorno = "";
    palavras.forEach((valor:string) => {
      while(valor.length > max){
        valor = valor.substr(max , valor.length+1) + " " ;
        retorno += " " + valor.substr(0 , max);
      }
      retorno += " " + valor;
    });
    return retorno;
  }
  

}
