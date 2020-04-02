import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { CurrencyMaskModule } from "ng2-currency-mask";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import {
  MatToolbarModule,
  MatIconModule,
  MatSelectModule,
  MatFormFieldModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatTabsModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatListModule,
  MatButtonToggleModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatGridListModule,
  MatTableModule,
  MatMenuModule,
  MatDialogModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatPaginatorModule,
  MatExpansionModule,
  MatProgressBarModule,
  MatSlideToggleModule,
  MatChipsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatBadgeModule,
  MatRadioButton,
  MatRadioModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { UsuarioModalComponent } from './component/usuario-modal/usuario-modal.component';
import { ReferenciaComponent } from './component/referencia/referencia.component';
import { ReferenciaModalComponent } from './component/referencia-modal/referencia-modal.component';
import { AguardeComponent } from './component/aguarde/aguarde.component';
import { ConfirmacaoComponent } from './component/confirmacao/confirmacao.component';
import { ApiService } from './service/api.service';
import { MensagemService } from './service/mensagem.service';
import { AguardeService } from './service/aguarde.service';
import { AuthGuard } from './_guards/auth.guards';
import { AuthenticationService } from './_services/authentication.service';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';
import { ContaComponent } from './component/conta/conta.component';
import { TrocaSenhaComponent } from './component/troca-senha/troca-senha.component';
import { GrupoComponent } from './component/grupo/grupo.component';
import { GrupoModalComponent } from './component/grupo-modal/grupo-modal.component';
import { CampanhaLayoutComponent } from './layouts/campanha-layout/campanha-layout.component';
import { CampanhaCadastroComponent } from './component/campanha-cadastro/campanha-cadastro.component';


registerLocaleData(localePt, 'pt-BR');

//npm install ng2-currency-mask --save
export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};


const routes: Routes = [
  
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      { path: 'usuario', component: UsuarioComponent },
      { path: 'referencia', component: ReferenciaComponent },
      { path: 'grupo', component: GrupoComponent },                 
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'troca-senha',
        component: TrocaSenhaComponent
      }
    ]
  },
  {
    path: '',
    component: CampanhaLayoutComponent,
    children: [      
      {
        path: 'cadastro-campanha',
        component: CampanhaCadastroComponent
      },       
    ]
  },  
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    CampanhaLayoutComponent,
    UsuarioComponent,
    UsuarioModalComponent,
    ReferenciaComponent,
    ReferenciaModalComponent,
    AguardeComponent,
    ConfirmacaoComponent,
    ContaComponent,
    TrocaSenhaComponent,
    GrupoComponent,
    GrupoModalComponent,
    CampanhaCadastroComponent    
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CurrencyMaskModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatGridListModule,
    MatTableModule,
    MatMenuModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatBadgeModule,
    MatRadioModule
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthGuard,
    AuthenticationService,
    AguardeService,
    ApiService,
    MensagemService,
    MatDatepickerModule,
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }, { provide: LOCALE_ID, useValue: 'pt-BR' }, 
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },    
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  entryComponents: [
    AguardeComponent,
    ReferenciaModalComponent,
    ConfirmacaoComponent,
    UsuarioModalComponent,
    GrupoModalComponent,    
  ]
})
export class AppModule { }
