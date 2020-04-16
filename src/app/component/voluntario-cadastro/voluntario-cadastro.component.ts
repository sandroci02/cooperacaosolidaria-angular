import { Component, OnInit } from '@angular/core';
import { AguardeService } from '../../service/aguarde.service';
import { ApiService } from '../../service/api.service';
import { MensagemService } from '../../service/mensagem.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voluntario-cadastro',
  templateUrl: './voluntario-cadastro.component.html',
  styleUrls: ['./voluntario-cadastro.component.css']
})
export class VoluntarioCadastroComponent implements OnInit {
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
          type: "CONTRIBUTOR",
          first_name: this.data.primeiroNome,
          last_name: this.data.ultimoNome,
          cpf_cnpj: this.data.cpf,
          phone1: this.data.telefone,
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
          ]
        }

        this.service.do('user/register', envelope).subscribe(data => {
          this.mensagem.sucesso("Voluntário cadastrado com Sucesso");
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

  voltar() {
    this.contador = 1;
  }

  completar() {
    this.verificaErros().subscribe(ver => {
      this.clicado = 1;
      if (!ver) {
        this.clicado = 0;
        this.data.nome = this.data.primeiroNome + " " + this.data.ultimoNome;
        this.contador = 2;
        this.mapErros.set("telefone", this.data.telefone);
        this.mapErros.set("cpf", this.data.cpf);
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
      //console.log(key + "-> " + this.data[key].length);
      if (this.data[key].length < 1) {
        erro = true;
      }
    });
    return of(erro);
  }

}
