
import { Component, OnInit, Inject, Input } from '@angular/core';
import { ParametroData } from '../../model/parametroData.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../../service/api.service';
import { AguardeService } from '../../service/aguarde.service';
import { MensagemService } from '../../service/mensagem.service';
import { Grupo } from '../grupo/grupo.component';
import { Usuario } from '../usuario/usuario.component';
import { Selecao } from 'src/app/model/selecao.model';
import { load } from '@angular/core/src/render3';

@Component({
  selector: 'app-grupo-modal',
  templateUrl: './grupo-modal.component.html',
  styleUrls: ['./grupo-modal.component.css']
})
export class GrupoModalComponent implements OnInit {

  parametro: ParametroData;
  acao: String;
  usuarios: Selecao[];

  constructor(public dialogRef: MatDialogRef<GrupoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Grupo, public service: ApiService, public aguardeService: AguardeService, private mensagem: MensagemService) {
  }

  selecionar(selecionado: Selecao) {
    if (selecionado.desabilitado) {
      return;
    }

    this.parametro = {
      filtros: {},
      parametros: { grupo: JSON.stringify(this.data), selecionado: !selecionado.selecionado, usuario: JSON.stringify(selecionado.valor) },
    };

    this.service.do('grupo/selecionar', this.parametro).subscribe(retorno => {
      this.load();
    }, error => {
      this.mensagem.erro("Não foi possível executar a ação : " + error.error.message);
    });

  }

  ngOnInit() {

    this.load();

    if (this.data.id === null) {
      this.acao = "Criar "
    } else {
      this.acao = "Alterar  "
    }
  }


  load() {
    this.parametro = {
      filtros: {},
      parametros: { grupo: JSON.stringify(this.data) }
    };


    const aguarde = this.aguardeService.aguarde();
    this.service.getDetalhe('grupo', this.parametro).subscribe(retorno => {
      this.usuarios = retorno.auxiliar.usuarios;
      aguarde.close();
    }, error => {
      this.mensagem.erro("Não foi possível executar a ação : " + error.error.message);
      aguarde.close();
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  salvar() {
    const aguarde = this.aguardeService.aguarde();

    this.parametro = {
      filtros: {},
      parametros: { grupo: JSON.stringify(this.data) },
      save: this.data.id === null
    };

    this.service.save('grupo', this.parametro).subscribe(data => {
      console.log(data);
      if (data.erro) {
        this.mensagem.erro(data.mensagem);
      } else {
        this.mensagem.sucesso(data.mensagem);

      }
      aguarde.close();
      this.onNoClick();
    }, error => {
      this.mensagem.erro("Não foi possível executar a ação : " + error.error.message);
      aguarde.close();
      this.onNoClick();
    });

  }
}


