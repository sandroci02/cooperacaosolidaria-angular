import { Component, OnInit } from '@angular/core';
import { AguardeService } from '../../service/aguarde.service';
import { ApiService } from '../../service/api.service';
import { MensagemService } from '../../service/mensagem.service';

@Component({
  selector: 'app-voluntario-cadastro',
  templateUrl: './voluntario-cadastro.component.html',
  styleUrls: ['./voluntario-cadastro.component.css']
})
export class VoluntarioCadastroComponent implements OnInit {
  confirmarSenha = ""
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
    nome: ""
  }

  constructor(private aguardeService: AguardeService, private service: ApiService, private mensagem: MensagemService) { }

  contador = 1;

  ngOnInit() {
  }

  criar() {

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
      console.log(data);
      if (data.success) {
        this.mensagem.sucesso("Voluntário cadastrado com Sucesso");
      } else {
        this.mensagem.erro(data.message);
      }
      aguarde.close();
    }, error => {
      this.mensagem.erro("Não foi possível executar a ação : " + error.error.message);
      aguarde.close();
    });
  }

  cancelar() {

  }

  completar() {
    this.data.nome = this.data.primeiroNome + " " + this.data.ultimoNome;
    this.contador = 2;
  }

}
