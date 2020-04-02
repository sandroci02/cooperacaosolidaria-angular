
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator, MatDialog } from '@angular/material';
import { Paginador } from '../../model/paginador.model';
import { ParametroData } from '../../model/parametroData.model';
import { AguardeService } from '../../service/aguarde.service';
import { ApiService } from '../../service/api.service';
import { MensagemService } from '../../service/mensagem.service';
import { UsuarioModalComponent } from '../usuario-modal/usuario-modal.component';
import { ConfirmacaoComponent } from '../confirmacao/confirmacao.component';
import { Grupo } from '../grupo/grupo.component';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  displayedColumns: string[] = ['nome','login','grupo','perfil','acao'];
  dataSource: Usuario[];
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

    this.service.getList('usuario', this.parametro).subscribe(data => {
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
      parametros: { limite: "10", pagina: "1", order: "nome", asc: true }
    };
  }

  openDialogEdit(selecionado: Usuario): void {
    const dialogRef = this.dialog.open(UsuarioModalComponent, {
      width: '600px',
      data: selecionado
    });

    dialogRef.afterClosed().subscribe(result => {
      this.find();
    });
  }

  openDialogNew(): void {
    const novo = {id:null};
    const dialogRef = this.dialog.open(UsuarioModalComponent, {
      width: '600px',
      data: novo
    });

    dialogRef.afterClosed().subscribe(result => {
      this.find();
    });
  }

  openDialogExcluir(selecionado: Usuario): void {
    const dialogRef = this.dialog.open(ConfirmacaoComponent, {
      width: '450px',
      data: {titulo: 'Tem certeza?' , mensagem: 'Excluir Usuário '+ selecionado.nome 
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
        this.service.excluir('usuario',this.parametroExclusao).subscribe(data => {
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

openDialogReset(selecionado: Usuario): void {
  const dialogRef = this.dialog.open(ConfirmacaoComponent, {
    width: '450px',
    data: {titulo: 'Tem certeza?' , mensagem: 'Resetar a senha do Usuário '+ selecionado.nome 
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
      this.service.do('usuario/reset',this.parametroExclusao).subscribe(data => {
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



export interface Usuario {
 id?: Number;
 nome :String;
senha? :String;
login :String;
perfil :Number;
senhaPadrao?: Boolean;
version?: Number;
}


