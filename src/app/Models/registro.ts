export interface RegistroInterface{
    id?:string;
    nombre?:string;
    correo?:string;
    admin?: boolean;
    suadmin?: boolean;
    ubicacion?:string;
    tipo?: string;
}