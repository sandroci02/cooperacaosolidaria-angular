import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campanha-cadastro',
  templateUrl: './campanha-cadastro.component.html',
  styleUrls: ['./campanha-cadastro.component.css']
})
export class CampanhaCadastroComponent implements OnInit {


  aceitaGrupo = {
    epis: false,
    respidradores: false,
    leitos: false,
    alcoolGel: false,
    cestasBasicas: false,
    alimentos: false,
    itensHigiene: false,
    materiaisLimpeza: false,
    roupas: false,
    fraldasGeriatricas: false
  };

  zonaGrupo = {
    norte: false,
    sul: false,
    central: false,
    leste: false,
    oeste: false,
    rural: false
  }

  pagamentoGrupo = {
    pagseguro: false,
    mercadopago: false,
    paypal: false,
    recebeaqui: false,
    vakinhaonline: false
  }

  contaGrupo = {
    banco: "",
    agencia: "",
    contaCorrente: "",
    cpf: "",
    nome: ""
  }

  listaConta = [];
  listaColeta = [];

  coletaGrupo = { logradouro: "", numero: "", complemento: "", bairro: "", municipio: "" }

  data = { nome: "", descricao: "", beneficiario: "", aceita: this.aceitaGrupo, zona: this.zonaGrupo, cidade: "", estado: "", pagto: this.pagamentoGrupo, conta: this.listaConta, coleta: this.listaColeta }
  constructor() { }

  contador = 1

  ngOnInit() {
  }

  avancar(){
    if(this.contador < 6){
      this.contador++;
    }
  }

  voltar(){
    if(this.contador > 1){
      this.contador--;
    }
  }

  adicionarConta() {
    this.listaConta.push(this.contaGrupo);

    this.contaGrupo = {
      banco: "",
      agencia: "",
      contaCorrente: "",
      cpf: "",
      nome: ""
    }

  }

  adicionarColeta() {
    this.listaColeta.push(this.coletaGrupo);

    this.coletaGrupo = { logradouro: "", numero: "", complemento: "", bairro: "", municipio: "" }

  }

}
