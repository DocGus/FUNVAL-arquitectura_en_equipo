
import type { Paciente } from "../interfaces/Paciente";

export const pacientes: Paciente[] = [
  {
    id: 1,
    dni: "12345678",
    nombre: "Ana López",
    edad: 28,
    telefono: "5512345678",
    obraSocial: true,
  },
  {
    id: 2,
    dni: "87654321",
    nombre: "Carlos Méndez",
    edad: 45,
    telefono: "5587654321",
    obraSocial: false,
  },
];

export function obtenerSiguienteId(): number {
  if (pacientes.length === 0) {
    return 1;
  }

  return Math.max(...pacientes.map((paciente) => paciente.id)) + 1;
}
