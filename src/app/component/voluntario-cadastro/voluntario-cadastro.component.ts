import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-voluntario-cadastro',
  templateUrl: './voluntario-cadastro.component.html',
  styleUrls: ['./voluntario-cadastro.component.css']
})
export class VoluntarioCadastroComponent implements OnInit {
  confirmarSenha = ""          
  data = {primeiroNome:"",ultimoNome:"",email:"",senha:""}
  constructor() { }

  ngOnInit() {
  }

  criar(){

  }

  cancelar(){
    
  }

}
