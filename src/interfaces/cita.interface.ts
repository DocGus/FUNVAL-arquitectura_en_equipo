export type EstadoCita = "pendiente" | "atendido";

export interface CitaMedica {
  id: number;
  pacienteId: number;
  medicoId: number;
  fechaHora: string;
  estado: EstadoCita;
}

export interface CrearCitaInput {
  pacienteId: number;
  medicoId: number;
  fechaHora: string;
  estado?: EstadoCita;
}
