import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-voluntario-continua-cadastro',
  templateUrl: './voluntario-continua-cadastro.component.html',
  styleUrls: ['./voluntario-continua-cadastro.component.css']
})
export class VoluntarioContinuaCadastroComponent implements OnInit {

  usuario = {nome:"Alessandro Silva",email:"sandro.ci02@gmail.com"}
  data = {
    cpf: "",
    telefone: "",
    whatsapp: "sim",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    municipio: "",
    facebook: "",
    instagram: ""
  }

  constructor() { }

  ngOnInit() {
  }

}
