import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { MensagemService } from 'src/app/service/mensagem.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router, private api: ApiService, private mensagem: MensagemService) { }

  nome: String;

  ngOnInit() {
  }

  getLogado(){
    this.nome = localStorage.getItem("nome");    
    return this.nome !== undefined && this.nome !== null && this.nome.length > 0;
  }

  logout() {
    this.nome = undefined ;
    this.authenticationService.logout();
  }

  login() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }

  irHome() {
    this.router.navigate(["/home"]);
  }

  irCampanha() {
    localStorage.removeItem('detalhe');        
    this.router.navigate(["/cadastro-campanha"]);
  }

  irCadastro() {
    localStorage.removeItem('detalhe');        
    this.router.navigate(["/cadastro"]);
  }  
}
