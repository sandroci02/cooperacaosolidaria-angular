import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instituicao-cadastro',
  templateUrl: './instituicao-cadastro.component.html',
  styleUrls: ['./instituicao-cadastro.component.css']
})
export class InstituicaoCadastroComponent implements OnInit {

  confirmarSenha = ""          
  data = {nome:"",email:"",senha:""}
  constructor() { }

  ngOnInit() {
  }

  criar(){

  }

  cancelar(){
    
  }
}
