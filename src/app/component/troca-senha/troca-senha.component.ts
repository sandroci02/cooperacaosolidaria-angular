import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ParametroData } from 'src/app/model/parametroData.model';
import { Usuario } from '../usuario/usuario.component';
import { MensagemService } from 'src/app/service/mensagem.service';

@Component({
  selector: 'app-troca-senha',
  templateUrl: './troca-senha.component.html',
  styleUrls: ['./troca-senha.component.css']
})
export class TrocaSenhaComponent implements OnInit {

  senhaForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  parametro: ParametroData;
  usuario: Usuario;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private mensagem: MensagemService
  ) { }

  ngOnInit() {
    this.senhaForm = this.formBuilder.group({
      password: ['', Validators.required],
      repita: ['', Validators.required]
    });

    this.usuario = JSON.parse(localStorage.getItem('usuario'));

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/troca-senha';
  }

  // convenience getter for easy access to form fields
  get f() { return this.senhaForm.controls; }

  irDashboard(){    
    this.router.navigate(["/dashboard"]);
  }

  onSubmit() {
    this.submitted = true;


    if(this.f.password.value != this.f.repita.value){
      this.senhaForm.controls['repita'].setErrors({'incorrect': true});
      this.error = "Senhas diferentes!";
    }

    // stop here if form is invalid
    if (this.senhaForm.invalid) {
      return;
    }

    this.loading = true;
    this.parametro = {
      filtros: {},
      parametros: { "senha" : this.f.password.value}
    };

    this.authenticationService.trocaSenha(this.parametro)
      .subscribe(
        data => {
          if (data.erro) {
            this.error = data.mensagem;
            this.loading = false;
            this.mensagem.erro(data.mensagem);
          }else{
            localStorage.setItem('usuario', data.entidade);
  
            this.mensagem.info("Senha alterada com sucesso");
  
            this.router.navigate(["/dashboard"]);
          }
        },
        error => {          
          this.error = error;
          this.loading = false;
        });
  }

}
