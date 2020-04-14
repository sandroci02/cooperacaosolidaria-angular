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
import { CampanhaCadastroComponent } from './component/campanha-cadastro/campanha-cadastro.component';
import { VoluntarioCadastroComponent } from './component/voluntario-cadastro/voluntario-cadastro.component';
import { InstituicaoCadastroComponent } from './component/instituicao-cadastro/instituicao-cadastro.component';
import { HomeComponent } from './component/home/home.component';
import { DetalheComponent } from './component/detalhe/detalhe.component';
import { HeaderComponent } from './component/header/header.component';
import { SimplesCadastroComponent } from './component/simples-cadastro/simples-cadastro.component';

import { TextMaskModule } from 'angular2-text-mask';


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
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'detalhe',
        component: DetalheComponent
      },
      {
        path: 'cadastro',
        component: SimplesCadastroComponent
      },
      /*{
        path: 'cadastro-voluntario',
        component: VoluntarioCadastroComponent
      },     
      {
        path: 'cadastro-instituicao',
        component: InstituicaoCadastroComponent
      },*/
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'cadastro-campanha',
        component: CampanhaCadastroComponent
      },       
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
    AguardeComponent,
    ConfirmacaoComponent,
    CampanhaCadastroComponent,
    VoluntarioCadastroComponent,
    InstituicaoCadastroComponent,
    HomeComponent,
    DetalheComponent,
    HeaderComponent,
    SimplesCadastroComponent,
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
    MatRadioModule,
    TextMaskModule 
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
    ConfirmacaoComponent,
  ]
})
export class AppModule { }
