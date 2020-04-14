import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.css']
})
export class LoginLayoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {    
    this.router.navigate(["/login"]);
  }

  irHome() {
    this.router.navigate(["/home"]);
  }

  irCampanha() {
    localStorage.removeItem('detalhe');        
    this.router.navigate(["/cadastro-campanha"]);
  }

  irCadastroVoluntario() {
    localStorage.removeItem('detalhe');        
    this.router.navigate(["/cadastro-voluntario"]);
  }

  irCadastroInstituicao() {
    localStorage.removeItem('detalhe');        
    this.router.navigate(["/cadastro-instituicao"]);
  }

}
