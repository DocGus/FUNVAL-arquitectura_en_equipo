import type { Consultorio } from '../interfaces/consultorio.interface';
export const consultorios: Consultorio[] = [
    {
        id: 1,
        numeroSala: 101,
        piso: 1,
        activo: true,
        tipoAtencion: 'Pediatria',
    },
    {
        id: 2,
        numeroSala: 202,
        piso: 2,
        activo: true,
        tipoAtencion: 'Cardiologia',
    },
    {
        id: 3,
        numeroSala: 303,
        piso: 3,
        activo: false,
        tipoAtencion: 'Traumatologia',
    },
];