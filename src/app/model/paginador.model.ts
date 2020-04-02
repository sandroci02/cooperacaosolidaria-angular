
export interface Paginador {
    total: Number;
	totalPages: Number;
	paginas: Number[];
	elementos: Number;
	pagina : Number;
	proximo : Number;
	anterior: Number;
	asc: Boolean;
	order: String;
	resumo: String;
	semRegistro: Boolean;
}
