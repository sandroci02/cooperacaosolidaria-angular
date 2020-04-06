import { Component, OnInit } from '@angular/core';
import { AguardeService } from '../../service/aguarde.service';
import { ApiService } from '../../service/api.service';
import { MensagemService } from '../../service/mensagem.service';

@Component({
  selector: 'app-instituicao-cadastro',
  templateUrl: './instituicao-cadastro.component.html',
  styleUrls: ['./instituicao-cadastro.component.css']
})
export class InstituicaoCadastroComponent implements OnInit {

  confirmarSenha = "";
  listaConta = []

  contaGrupo = {
    banco: "",
    agencia: "",
    numeroConta: "",
    nome:"",
    cpfCNPJ: "",
    tipo:""
  }

  data = {
    nome: "",
    email: "",
    senha: "",
    cnpj: "",
    telefone: "",
    celular: "",
    whatsapp: "",
    mesAnoFundacao: "",
    cidadeAtuacao: "",
    zona: {
      norte: false,
      sul: false,
      central: false,
      leste: false,
      oeste: false,
      rural: false
    },
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    municipio: "",
    estado: "",
    facebook: "",
    instagram: "",
    site: "",
    primeiroNomeResponsavel: "",
    ultimoNomeResponsavel: "",
    emailResponsavel: "",
    cpf: "",
    pagSeguro: "",
    mercadoPago: "",
    paypal: "",
    recebeAqui: "",
    vakinhaOnline: "",
  }



  constructor(private aguardeService: AguardeService, private service: ApiService, private mensagem: MensagemService) { }

  contador = 1;

  ngOnInit() {
  }

  getZona() {
    let retorno = []    
    if (this.data.zona.norte) {
      retorno.push("Zona norte")
    }
    if (this.data.zona.sul) {
      retorno.push("Zona sul")
    }
    if (this.data.zona.central) {
      retorno.push("Zona central")
    }
    if (this.data.zona.leste) {
      retorno.push("Zona leste")
    }
    if (this.data.zona.oeste) {
      retorno.push("Zona oeste")
    }
    if (this.data.zona.rural) {
      retorno.push("Zona rural")
    }

    return retorno;
  }

  criar() {

    let envelope = {
      email: this.data.email,
      password: this.data.senha,
      first_name: this.data.primeiroNomeResponsavel,
      last_name: this.data.ultimoNomeResponsavel,
      name_organization: this.data.nome,
      cpf_cnpj: this.data.cnpj,
      phone1: this.data.telefone,
      type: "ORGANIZATION",
      site: this.data.site,
      facebook: this.data.facebook,
      instagram: this.data.instagram,
      group_finality: "-",
      accepted_donate: true,
      goal: 50,
      address: [
        {
          street: this.data.logradouro,
          number: this.data.numero,
          complement: this.data.complemento,
          district: this.data.bairro,
          city: this.data.municipio,
          state: this.data.estado,
          country: "Brasil",
          postal_code: this.data.cep
        }
      ],
      account_bank: {
        name_banking: this.contaGrupo.banco,
        agency: this.contaGrupo.agencia,
        account_number: this.contaGrupo.numeroConta,
        name_favored: this.contaGrupo.nome,
        cpf_cnpj: this.contaGrupo.cpfCNPJ
      },
      help_types: [
        /*Transferência bancária,
        Doação direta de alimentos,
        Doação de roupas*/
      ],
      served_region: this.getZona(),    
      assisted_entities: [/*
           {
             name: Fernando da silva,
             street: Av. Brasil,
             number: 123,
             complement: Sala 1,
             district: Centro,
             city: Porto Alegre,
             state: RS,
             country: Brasil,
             postal_code: 90520000
           },
           {
             name: João Manoel,
             street: Restinga,
             number: 123,
             complement: Sala 1,
             district: Centro,
             city: Porto Alegre,
             state: RS,
             country: Brasil,
             postal_code: 90520000
           }*/
      ]
    }

    const aguarde = this.aguardeService.aguarde();

    this.service.do('user/register', envelope).subscribe(data => {
      console.log(data);
      if (data.success) {
        this.mensagem.sucesso("Voluntário cadastrado com Sucesso");
      } else {
        this.mensagem.erro(data.message);
      }
      aguarde.close();
    }, cat => {
      this.mensagem.erro("Não foi possível executar a ação : " + cat.error.error.details[0].message);
      aguarde.close();
    });
  }


  completar() {
    this.contador = 2;
  }
}
