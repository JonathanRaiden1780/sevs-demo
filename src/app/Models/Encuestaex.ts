export interface EncuestaexInterface{
    id?:string;
    Folio?:string;
    pregunta1?:number;
    pregunta2?:number;
    pregunta3?:number;
    pregunta4?:number;
    pregunta5?:number;
    pregunta6?:number;
    pregunta7?:number;
    pregunta8?:number;
    pregunta9?:string;
    pregunta9cont?:number;
    pregunta10?:string;
    pregunta10cont?:number;
    cont?:number;
    fecha?:string;
    total?:number;
    tipo?:string;
    contestada?:boolean;
    validacion?: string;
    ubicacion?: string;
    fecharegistro?:string;
    fechareporte?:string;
}