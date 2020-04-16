import { Component, OnInit } from '@angular/core';
import { AguardeService } from '../../service/aguarde.service';
import { ApiService } from '../../service/api.service';
import { MensagemService } from '../../service/mensagem.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instituicao-cadastro',
  templateUrl: './instituicao-cadastro.component.html',
  styleUrls: ['./instituicao-cadastro.component.css']
})
export class InstituicaoCadastroComponent implements OnInit {

  data = {
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
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
    banco: "",
    agencia: "",
    numeroConta: "",
    nomeCompleto: "",
    cpfCNPJ: "",
    tipo: ""
  }




  constructor(private aguardeService: AguardeService, private service: ApiService, private mensagem: MensagemService, private router: Router) { }

  clicado = 0;
  contador = 1;


  mapErros: Map<String, any>;

  ngOnInit() {
    this.mapErros = new Map();
    this.mapErros.set("nome", this.data.nome);
    this.mapErros.set("email", this.data.email);
    this.mapErros.set("senha", this.data.senha);
    this.mapErros.set("confirmarSenha", this.data.confirmarSenha);
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
        name_banking: this.data.banco,
        agency: this.data.agencia,
        account_number: this.data.numeroConta,
        name_favored: this.data.nomeCompleto,
        cpf_cnpj: this.data.cpfCNPJ
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

    this.clicado++;


    this.verificaErros().subscribe(ver => {
      //console.log("verifica erros" + ver)
      if (!ver) {
        const aguarde = this.aguardeService.aguarde();

        this.service.do('user/register', envelope).subscribe(data => {
          this.mensagem.sucesso("Instituição cadastrada com Sucesso");
          aguarde.close();
          this.router.navigate(["/home"]);
        }, cat => {
          console.log(cat.error);
          if (cat.error.error.details) {
            this.mensagem.erro("Não foi possível executar a ação : " + cat.error.error.details[0].message);
          } else {
            this.mensagem.erro("Não foi possível executar a ação : " + cat.error.error);
          }
          aguarde.close();
        });
      } else {
        this.mensagem.erro("Verifique os campos obrigatórios");
      }
    });
  }

  senhaValida() {
    return this.data.senha !== this.data.confirmarSenha;
  }

  vazio(atributo) {
    if (this.mapErros.has(atributo)) {
      let valor = this.data[atributo];
      return this.clicado > 0 && (valor === undefined || valor.length < 1);
    }
    return false;
  }

  voltar() {
    if (this.contador > 1) {
      this.contador--;
    }
  }

  avancar() {
    if (this.contador === 1) {
      this.verificaErros().subscribe(ver => {
        if (!ver) {
          this.contador++;
          this.mapErros.set("telefone", this.data.telefone);
          this.mapErros.set("celular", this.data.celular);
          this.clicado = 0;
        } else {
          this.clicado = 1;
        }
      });
    }
    else if (this.contador === 2) {
      this.verificaErros().subscribe(ver => {
        if (!ver) {
          this.contador++;
          this.mapErros.set("facebook", this.data.facebook);
          this.mapErros.set("instagram", this.data.instagram);
          this.mapErros.set("site", this.data.site);
          this.clicado = 0;
        } else {
          this.clicado = 1;
        }
      });
    }
    else if (this.contador === 3) {
      this.verificaErros().subscribe(ver => {
        if (!ver) {
          this.contador++;
          this.mapErros.set("primeiroNomeResponsavel", this.data.primeiroNomeResponsavel);
          this.mapErros.set("ultimoNomeResponsavel", this.data.ultimoNomeResponsavel);
          this.clicado = 0;
        } else {
          this.clicado = 1;
        }
      });
    }
    else if (this.contador === 4) {
      this.verificaErros().subscribe(ver => {
        if (!ver) {
          this.mapErros.set("banco", this.data.banco);
          this.mapErros.set("agencia", this.data.agencia);
          this.mapErros.set("numeroConta", this.data.numeroConta);
          this.mapErros.set("cpfCNPJ", this.data.cpfCNPJ);
          this.mapErros.set("nomeCompleto", this.data.nomeCompleto);
          this.clicado = 0;
          this.contador++;
        } else {
          this.clicado = 1;
        }
      });
    } else if (this.contador === 5) {
      this.contador++;
    }
  }


  verificaErros(): Observable<boolean> {

    let erro = false;
    this.mapErros.forEach((valor: string, key: string) => {
      //console.log(key + "-> " + this.data[key].length);
      if (this.data[key].length < 1) {
        erro = true;
      }
    });
    return of(erro);
  }
}
