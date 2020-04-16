import { Injectable } from '@angular/core';
import { Mensagem } from '../model/mensagem.model';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor() { }


  showNotification(from: String, align: String, data: Mensagem) {


    $.notify({
      icon: data.icone,
      message: data.texto

    }, {
        type: data.tipo ,
        timer: 3000,
        placement: {
          from: from,
          align: align
        },
        template: '<div data-notify="container" class="toast-m col-6 alert alert-{0} alert-with-icon" role="alert">' +          
          '<i class="material-icons" data-notify="icon">'+ data.icone +'</i> ' +
          '<span data-notify="message">{2}</span>' +          
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }

  sucesso(mensagem: String) {    
    const data  = { texto: mensagem, tipo: 'success', icone: 'done'}
    this.showNotification('top','right',data);
  }

  erro(mensagem: String) {
    const data  = { texto: mensagem, tipo: 'danger', icone: 'error_outline'}
    this.showNotification('top','right',data);
  }

  info(mensagem: String) {
    const data  = { texto: mensagem, tipo: 'info', icone: 'warning'}
    this.showNotification('top','right',data);
  }
}
