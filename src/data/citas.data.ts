import { CitaMedica } from "../interfaces/cita.interface";

export const citasMedicas: CitaMedica[] = [
  {
    id: 1,
    pacienteId: 101,
    medicoId: 201,
    fechaHora: "2026-11-02T08:00:00.000Z",
    estado: "pendiente"
  },
  {
    id: 2,
    pacienteId: 102,
    medicoId: 202,
    fechaHora: "2026-11-02T09:30:00.000Z",
    estado: "atendido"
  },
  {
    id: 3,
    pacienteId: 103,
    medicoId: 203,
    fechaHora: "2026-11-03T11:00:00.000Z",
    estado: "pendiente"
  },
  {
    id: 4,
    pacienteId: 104,
    medicoId: 201,
    fechaHora: "2026-11-04T15:00:00.000Z",
    estado: "pendiente"
  },
  {
    id: 5,
    pacienteId: 105,
    medicoId: 202,
    fechaHora: "2026-11-05T16:30:00.000Z",
    estado: "atendido"
  }
];
