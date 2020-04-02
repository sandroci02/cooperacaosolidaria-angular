import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator, MatDialog } from '@angular/material';
import { Paginador } from '../../model/paginador.model';
import { ParametroData } from '../../model/parametroData.model';
import { AguardeService } from '../../service/aguarde.service';
import { ApiService } from '../../service/api.service';
import { MensagemService } from '../../service/mensagem.service';
import { ReferenciaModalComponent } from '../referencia-modal/referencia-modal.component';
import { ConfirmacaoComponent } from '../confirmacao/confirmacao.component';


@Component({
  selector: 'app-referencia',
  templateUrl: './referencia.component.html',
  styleUrls: ['./referencia.component.css']
})
export class ReferenciaComponent implements OnInit {

  displayedColumns: string[] = ['descricao', 'acao'];
  dataSource: Referencia[];
  parametro: ParametroData;
  parametroExclusao: ParametroData;
  parametroPaginador: ParametroData;
  paginador: Paginador;

  @ViewChild(MatPaginator) paginatorComponent: MatPaginator;

  constructor(private service: ApiService, private mensagem: MensagemService, private aguardeService: AguardeService, public dialog: MatDialog) { }

  ngOnInit() {
    this.clean();
    this.find();
  }


  find(pageEvent?: PageEvent) {
    const aguarde = this.aguardeService.aguarde();

    if (pageEvent) {
      this.parametro = JSON.parse(JSON.stringify(this.parametroPaginador));
      this.parametro.parametros['pagina'] = pageEvent.pageIndex + 1;
      this.parametro.parametros['pagina'] += "";
    } else {
      if (this.paginatorComponent) {
        this.paginatorComponent.pageIndex = 0;
      }
      this.parametroPaginador = JSON.parse(JSON.stringify(this.parametro));
    }

    this.service.getList('referencia', this.parametro).subscribe(data => {
      console.log(data);
      if (data.erro) {
        this.mensagem.erro(data.mensagem);
      } else {
        this.dataSource = data.lista;
        this.paginador = data.paginador;
      }
      aguarde.close();
    }, error => {
      this.mensagem.erro("Não foi possível executar a ação: " + error);
      aguarde.close();
    });
  }

  clean() {
    this.parametro = {
      filtros: {},
      parametros: { limite: "10", pagina: "1", order: "id", asc: true }
    };
  }

  openDialogEdit(selecionado: Referencia): void {
    const dialogRef = this.dialog.open(ReferenciaModalComponent, {
      width: '600px',
      data: selecionado
    });

    dialogRef.afterClosed().subscribe(result => {
      this.find();
    });
  }

  openDialogNew(): void {
    const novo = {id:null};
    const dialogRef = this.dialog.open(ReferenciaModalComponent, {
      width: '600px',
      data: novo
    });

    dialogRef.afterClosed().subscribe(result => {
      this.find();
    });
  }

  openDialogExcluir(selecionado: Referencia): void {
    const dialogRef = this.dialog.open(ConfirmacaoComponent, {
      width: '450px',
      data: {titulo: 'Tem certeza?' , mensagem: 'Excluir Referência '+ selecionado.descricao 
      }});

    dialogRef.afterClosed().subscribe(result => {
      const aguarde = this.aguardeService.aguarde();
      console.log(result);

      this.parametroExclusao = {
        filtros: {},
        parametros: {},
        id: selecionado.id
      };

      if (result) {
        this.service.excluir('referencia',this.parametroExclusao).subscribe(data => {
          if (data.erro) {
            aguarde.close();
            this.mensagem.erro(data.mensagem);
          } else {
            aguarde.close();
            this.mensagem.sucesso(data.mensagem);
          }
          this.find();
        }, error => {
          aguarde.close();
          this.mensagem.erro(error.error.message);
        });
      }else{
        aguarde.close();
      }
    }, error => {
      this.mensagem.erro(error.error.message);
    });
  }


}

export interface Referencia {
  id?: Number;
  descricao: String;
  version?: Number;
}
