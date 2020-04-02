import { Tipo } from './tipo.model';
import { Referencia } from '../component/referencia/referencia.component';

export interface Conta {
    id: Number;
    descricao: String;
    version: Number;
    tipo: Tipo;
    referencia: Referencia;
    valor: Number;
    padrao: Boolean;
}
