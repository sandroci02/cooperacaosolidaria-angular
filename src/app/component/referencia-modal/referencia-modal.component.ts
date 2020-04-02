import { Component, OnInit, Inject } from '@angular/core';
import { ParametroData } from '../../model/parametroData.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../../service/api.service';
import { AguardeService } from '../../service/aguarde.service';
import { MensagemService } from '../../service/mensagem.service';
import { Referencia } from '../referencia/referencia.component';

@Component({
  selector: 'app-referencia-modal',
  templateUrl: './referencia-modal.component.html',
  styleUrls: ['./referencia-modal.component.css']
})
export class ReferenciaModalComponent implements OnInit {

  parametro: ParametroData;
  acao: String;
  
  
  constructor( public dialogRef: MatDialogRef<ReferenciaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Referencia, public service: ApiService, public aguardeService: AguardeService,  private mensagem: MensagemService) { }

    ngOnInit(){
      console.log(this.data);
      if(this.data.id === null){
        this.acao = "Criar "    
       }else{
        this.acao = "Alterar  "    
       }
    }


  onNoClick(): void {
    this.dialogRef.close();
  }

  salvar(){
    const aguarde = this.aguardeService.aguarde();

    this.parametro = {
      filtros: {},
      parametros: { referencia: JSON.stringify(this.data)},
      save: this.data.id === null
    };

    this.service.save('referencia', this.parametro).subscribe(data => {
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
