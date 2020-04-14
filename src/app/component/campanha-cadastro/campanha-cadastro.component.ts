import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MatCheckboxChange } from '@angular/material';
import { AguardeService } from 'src/app/service/aguarde.service';
import { ApiService } from 'src/app/service/api.service';
import { MensagemService } from 'src/app/service/mensagem.service';
import { getOrCreateInjectable } from '@angular/core/src/render3/di';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campanha-cadastro',
  templateUrl: './campanha-cadastro.component.html',
  styleUrls: ['./campanha-cadastro.component.css']
})
export class CampanhaCadastroComponent implements OnInit {


  aceitaGrupo: Map<String, boolean>;

  zonaGrupo: Map<String, boolean>;

  pagamentoGrupo: Map<String, boolean>;

  pagamentos = {
    pagseguro: "",
    mercadopago: "",
    paypal: "",
    recebeaqui: "",
    vakinhaonline: "",
    account_bank: {}
  }

  contaGrupo = {
    banco: "",
    agencia: "",
    contaCorrente: "",
    cpf: "",
    nome: ""
  }

  tipo = "Fisica";

  listaConta = [];
  erroBanco: boolean;
  erroAgencia: boolean;
  erroCpf: boolean;
  erroNomeConta: boolean;
  erroCnpjInvalido: boolean;

  constructor(private aguardeService: AguardeService, private service: ApiService, private mensagem: MensagemService, private router: Router) {
    this.aceitaGrupo = new Map();
    this.zonaGrupo = new Map();
    this.pagamentoGrupo = new Map();
  }

  contador = 1;

  clicado = 0;

  mapErros: Map<String, any>;
  erroAceitaGrupo = false;
  erroZonaGrupo = false;
  erroPagamentoGrupo = false;
  erroConta = false;
  erroCpfInvalido = false;

  erroLogin = false;

  data = {
    email: "",
    nome: "",
    descricao: "",
    beneficiario: "",
    cidade: "",
    estado: "",
    incio: "",
    final: "",
    pontoColeta: "",
    banco: "",
    agencia: "",
    contaCorrente: "",
    cpf: "",
    nomeConta: "",
    coleta: ""
  }

  estados: any;

  ngOnInit() {

    this.estados = this.service.getEstados();

    let tokenInfo = this.service.getDecodedAccessToken(localStorage.getItem("token"));

    if (tokenInfo === undefined || tokenInfo === null) {
      this.erroLogin = true;
    } else {
      let email = tokenInfo.email;
      console.log(tokenInfo);
      this.data.email = email


      this.mapErros = new Map();
      this.mapErros.set("nome", this.data.nome);
      this.mapErros.set("descricao", this.data.descricao);
      this.mapErros.set("beneficiario", this.data.beneficiario);
      this.mapErros.set("cidade", this.data.cidade);
      this.mapErros.set("estado", this.data.estado);

    }
  }

  getCidades(estado) {
    let cidades = [];
    this.estados.forEach((valor: any) => {
      if (valor.nome === estado) {
        cidades = valor.cidades;
      }
    });
    return cidades;
  }

  login() {
    this.router.navigate(["/login"]);
  }


  concluir() {
    let today = new Date();
    let max = new Date().setDate(today.getDate() + 30);


    let envelope = {
      campaign_name: this.data.nome,
      reference_user: this.data.email,
      description: this.data.descricao,
      assisted_entity: this.data.beneficiario,
      type_donations: this.getAceita(),
      state: this.data.estado,
      city: this.data.cidade,
      served_region: this.getRegiao(),
      initial_date: this.data.incio === "" ? today : this.data.incio,
      final_date: this.data.final === "" ? max : this.data.final,
      donate_channels: [this.pagamentos],
      status: "ACTIVE",
      collect_spot: this.data.coleta === 'ponto_de_coleta' ? this.data.pontoColeta : 'A campanha vai até a casa do doador buscar a doação',     
    }

    const aguarde = this.aguardeService.aguarde();

    this.service.do('campaign/create', envelope).subscribe(data => {
      this.mensagem.sucesso("Campanha cadastrada com Sucesso");      
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
  }

  getAceita() {
    let retorno = [];
    this.aceitaGrupo.forEach((valor: boolean, key: string) => {
      if (valor) {
        retorno.push(key);
      }
    });
    return retorno;
  }

  getRegiao() {
    let retorno = [];
    this.zonaGrupo.forEach((valor: boolean, key: string) => {
      if (valor) {
        retorno.push(key);
      }
    });
    return retorno;
  }

  avancar() {
    if (this.contador === 1) {
      if (this.data.nome.length < 1 || this.data.descricao.length < 1) {
        this.clicado = 1;
      } else {
        this.contador++;
        this.clicado = 0;
      }
    }
    else if (this.contador === 2) {

      let nenhum = true;
      this.aceitaGrupo.forEach((valor: boolean, key: string) => {
        console.log(key + "-> " + valor);
        if (valor) {
          nenhum = false;
        }
      });

      if (this.data.beneficiario.length < 1 || nenhum) {
        this.clicado = 1;
        if (nenhum) {
          this.erroAceitaGrupo = true;
        }
      } else {
        this.contador++;
        this.clicado = 0;
        this.erroAceitaGrupo = false;
      }
    }
    else if (this.contador === 3) {

      let nenhum = true;
      this.zonaGrupo.forEach((valor: boolean, key: string) => {
        console.log(key + "-> " + valor);
        if (valor) {
          nenhum = false;
        }
      });

      if (this.data.cidade.length < 1 || this.data.estado.length < 1 || nenhum) {
        this.clicado = 1;
        if (nenhum) {
          this.erroZonaGrupo = true;
        }
      } else {
        this.contador++;
        this.clicado = 0;
        this.erroZonaGrupo = false;
      }
    }
    else if (this.contador === 4) {
      console.log(this.pagamentoGrupo);
      let nenhum = true;
      let erro = false;
      let deposito = false;

      this.erroBanco = false;
      this.erroAgencia = false;
      this.erroCpf = false;
      this.erroNomeConta = false;
      this.erroConta = false;
      this.erroCpfInvalido = false;
      this.erroCnpjInvalido = false;

      this.pagamentoGrupo.forEach((valor: boolean, key: string) => {

        if (valor) {
          nenhum = false;
        }


        if (key === 'deposito') {

          if (this.data.banco.length < 1) {
            deposito = true
            this.erroBanco = true;
          }
          if (this.data.agencia.length < 1) {
            deposito = true
            this.erroAgencia = true;
          }
          if (this.data.contaCorrente.length < 1) {
            deposito = true
            this.erroConta = true;
          }
          if (this.data.cpf.length < 1) {
            deposito = true
            this.erroCpf = true;
          }
          if (!this.isCpf(this.data.cpf) && this.tipo === 'Fisica') {
            deposito = true
            this.erroCpfInvalido = true;
          }
          if (!this.isCnpj(this.data.cpf) && this.tipo === 'Juridica') {
            deposito = true
            this.erroCnpjInvalido = true;
          }
          if (this.data.nomeConta.length < 1) {
            deposito = true
            this.erroNomeConta = true;
          }

          if(!deposito){
            this.pagamentos.account_bank ={
              name_banking: this.data.banco,
              agency: this.data.agencia,
              account_number: this.data.contaCorrente,
              account_type: this.tipo,
              name_favored: this.data.nomeConta,
              cpf_cnpj: this.data.cpf
            }
          }

        }
        else if (this.pagamentos[key].length < 1) {
          erro = true;
        }
      });

      if (erro) {
        nenhum = erro;
      }

      if (nenhum || deposito) {
        this.clicado = 1;
        if (nenhum) {
          this.erroPagamentoGrupo = true;
        }
      } else {
        this.contador++;
        this.clicado = 0;
        this.erroPagamentoGrupo = false;
      }
    }
  }


  pagamentoClique(event: MatCheckboxChange, chave: String): void {

    if (this.pagamentoGrupo.has(chave)) {
      this.pagamentoGrupo.delete(chave);
    } else {
      this.pagamentoGrupo.set(chave, true);
      this.erroPagamentoGrupo = false;
    }
  }


  aceitaClique(event: MatCheckboxChange, chave: String): void {

    if (this.aceitaGrupo.has(chave)) {
      this.aceitaGrupo.delete(chave);
    } else {
      this.aceitaGrupo.set(chave, true);
      this.erroAceitaGrupo = false;
    }
  }

  zonaClique(event: MatCheckboxChange, chave: String): void {

    if (this.zonaGrupo.has(chave)) {
      this.zonaGrupo.delete(chave);
    } else {
      this.zonaGrupo.set(chave, true);
      this.erroZonaGrupo = false;
    }
  }

  voltar() {
    if (this.contador > 1) {
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

  vazio(atributo) {
    if (this.mapErros.has(atributo)) {
      let valor = this.data[atributo];
      return this.clicado > 0 && (valor === undefined || valor.length < 1);
    }
    return false;
  }

  verificaErros(): Observable<boolean> {

    let erro = false;
    this.mapErros.forEach((valor: string, key: string) => {
      console.log(key + "-> " + this.data[key].length);
      if (this.data[key].length < 1) {
        erro = true;
      }
    });
    return of(erro);
  }


  public cpf = {
    guide: true,
    showMask: true,
    mask: [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]
  };

  public cnpj = {
    guide: true,
    showMask: true,
    mask: [/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]
  };




  isCpf(cpf: string): boolean {
    if (cpf == null) {
      return false;
    }

    cpf = cpf.replace(/[^\d]+/g, '')

    if (cpf.length != 11) {
      return false;
    }
    if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
      return false;
    }
    let numero: number = 0;
    let caracter: string = '';
    let numeros: string = '0123456789';
    let j: number = 10;
    let somatorio: number = 0;
    let resto: number = 0;
    let digito1: number = 0;
    let digito2: number = 0;
    let cpfAux: string = '';
    cpfAux = cpf.substring(0, 9);
    for (let i: number = 0; i < 9; i++) {
      caracter = cpfAux.charAt(i);
      if (numeros.search(caracter) == -1) {
        return false;
      }
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
      digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i: number = 0; i < 10; i++) {
      caracter = cpfAux.charAt(i);
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
      digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpf != cpfAux) {
      return false;
    }
    else {
      return true;
    }
  }

  isCnpj(cnpj) {

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14)
      return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
      cnpj == "11111111111111" ||
      cnpj == "22222222222222" ||
      cnpj == "33333333333333" ||
      cnpj == "44444444444444" ||
      cnpj == "55555555555555" ||
      cnpj == "66666666666666" ||
      cnpj == "77777777777777" ||
      cnpj == "88888888888888" ||
      cnpj == "99999999999999")
      return false;

    // Valida DVs
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
        pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
      return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
        pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
      return false;

    return true;

  }
}
