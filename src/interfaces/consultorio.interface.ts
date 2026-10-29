export interface Consultorio {
    id: number;
    numeroSala: number;
    piso: number;
    activo: boolean;
    tipoAtencion: string;
}
export type NuevoConsultorio = Omit<Consultorio, 'id'>;