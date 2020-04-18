import { Component, OnInit } from '@angular/core';
import { AguardeService } from 'src/app/service/aguarde.service';
import { ApiService } from 'src/app/service/api.service';
import { MensagemService } from 'src/app/service/mensagem.service';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { isDefaultChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';

@Component({
  selector: 'app-simples-cadastro',
  templateUrl: './simples-cadastro.component.html',
  styleUrls: ['./simples-cadastro.component.css']
})
export class SimplesCadastroComponent implements OnInit {

  data = {
    primeiroNome: "", ultimoNome: "", email: "", senha: "", cpf: "",
    telefone: "",
    whatsapp: "sim",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    municipio: "",
    facebook: "",
    instagram: "",
    estado: "",
    nome: "",
    confirmarSenha: ""
  }

  constructor(private aguardeService: AguardeService, private service: ApiService, private mensagem: MensagemService, private router: Router) { }

  clicado = 0;
  contador = 1;

  mapErros: Map<String, any>;

  ngOnInit() {
    this.mapErros = new Map();
    this.mapErros.set("primeiroNome", this.data.primeiroNome);
    this.mapErros.set("ultimoNome", this.data.ultimoNome);
    this.mapErros.set("email", this.data.email);
    this.mapErros.set("senha", this.data.senha);
    this.mapErros.set("confirmarSenha", this.data.confirmarSenha);
    this.mapErros.set("cpf", this.data.cpf);
    this.mapErros.set("telefone", this.data.telefone);
  }

  

  criar() {

    this.clicado++;


    this.verificaErros().subscribe(ver => {
      //console.log("verifica erros" + ver)
      if (!ver) {
        const aguarde = this.aguardeService.aguarde();

        let envelope = {
          email: this.data.email,
          password: this.data.senha,
          first_name: this.data.primeiroNome,
          last_name: this.data.ultimoNome,
          cpf_cnpj: this.data.cpf,
          phone1: this.data.telefone,
          type: "ORGANIZATION"
        }

        this.service.do('user/register', envelope).subscribe(data => {
          this.mensagem.sucesso("Cadastrado com Sucesso");
          aguarde.close();
          this.router.navigate(["/home"]);
        }, cat => {
          if (cat.error.error.details) {
            this.mensagem.erro(cat.error.error.details[0].message);
          } else {
            this.mensagem.erro(cat.error.error);
          }
          aguarde.close();
        });
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

  verificaErros(): Observable<boolean> {

    let erro = false;
    this.mapErros.forEach((valor: string, key: string) => {
      if (this.data[key].length < 1) {
        erro = true;
      }
    });

    if (erro) {
      this.mensagem.erro("Verifique os campos obrigatórios");
    }
    if (!erro && this.data.senha !== this.data.confirmarSenha) {
      erro = true;
      this.mensagem.erro("A confirmação deve ser igual a senha");
    }
    if (!erro && !this.isEmail(this.data.email)) {
      erro = true;
      this.mensagem.erro("O E-mail deve ser válido");
    }
    if (!erro && !this.isCpf(this.data.cpf)) {
      erro = true;
      this.mensagem.erro("O CPF deve ser válido");
    }
    return of(erro);
  }

  isEmail(email) {
    return /\S+@\S+\.\S+/.test(email)
  }
  
  public telefone = {
    guide: false,
    showMask: true,
    mask: ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  };

  public cpf = {
    guide: false,
    showMask: true,
    mask: [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]
  };




  isCpf(cpf: string): boolean {
    if (cpf == null) {
      return false;
    }

    cpf = cpf.replace(/[^\d]+/g,'')

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

}
