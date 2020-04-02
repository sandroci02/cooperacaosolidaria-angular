import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ParametroData } from 'src/app/model/parametroData.model';
import { Usuario } from 'src/app/component/usuario/usuario.component';
import { MensagemService } from 'src/app/service/mensagem.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent implements OnInit {

  parametro: ParametroData;
  usuario: Usuario;
  mensagens = 0;
  nome: String

  constructor(private authenticationService: AuthenticationService, private router: Router, private api: ApiService, private mensagem: MensagemService) { }

  ngOnInit() {
    this.nome = localStorage.getItem("nome")
    /*
    this.parametro = {
      filtros: {},
      parametros: {},
    };
    
    this.api.do('usuario/info',this.parametro).subscribe(
      data => {          
        localStorage.setItem('usuario',  JSON.stringify(data.entidade));
        this.usuario = data.entidade;

        if(data.auxiliar.padrao){
          this.mensagem.info("Você deve trocar a senha padrão");
          this.router.navigate(["/troca-senha"]);
        }

        this.verifica();

      },
      error => {
        console.log("erro",error)
      });


    */  
  }

    
  verifica(){
    setTimeout(()=>{  
      var currentdate = new Date(); 
var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
                
          this.mensagens = this.mensagens  +1;
          console.log(datetime + "="+this.mensagens);
          this.verifica();
    }, 60000 * 1);

  }


  logout() {
    this.authenticationService.logout();
  }

  goDashboard() {
    this.router.navigate(["/dashboard"]);
  }

  goTrocaSenha() {
    this.router.navigate(["/troca-senha"]);
  }
}
