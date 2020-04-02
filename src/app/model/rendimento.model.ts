import { Referencia } from '../component/referencia/referencia.component';

export interface Rendimento {
    id: Number;
    descricao: String;
    version: Number;
    referencia:Referencia;
    valor: Number;
}
