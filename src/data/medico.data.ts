import { Medico, NuevoMedico } from "../interfaces/medico.interface";

let medicos: Medico[] = [
  {
    id: 1,
    matricula: "MED001",
    nombreCompleto: "Carlos Pérez",
    especialidad: "Cardiología",
    aniosExperiencia: 10
  },
  {
    id: 2,
    matricula: "MED002",
    nombreCompleto: "Laura Gómez",
    especialidad: "Pediatría",
    aniosExperiencia: 5
  },
  {
    id: 3,
    matricula: "MED003",
    nombreCompleto: "Andrés Rodríguez",
    especialidad: "Neurología",
    aniosExperiencia: 8
  },
  {
    id: 4,
    matricula: "MED004",
    nombreCompleto: "María Torres",
    especialidad: "Dermatología",
    aniosExperiencia: 3
  },
  {
    id: 5,
    matricula: "MED005",
    nombreCompleto: "Julián Martínez",
    especialidad: "Medicina Interna",
    aniosExperiencia: 12
  }
];

let siguienteId = 6;

export const obtenerMedicos = (): Medico [] => {
  return medicos;
};

export const obtenerMedicoPorId = (id: number): Medico | undefined => {
return medicos.find ((medico) => medico.id === id);
};

export const crearMedico = (datos: NuevoMedico): Medico => {
  const nuevoMedico: Medico = {
    id: siguienteId,
    matricula: datos.matricula,
    nombreCompleto: datos.nombreCompleto,
    especialidad: datos.especialidad,
    aniosExperiencia: datos.aniosExperiencia
  };

  siguienteId++;

  medicos.push(nuevoMedico);

  return nuevoMedico;
};

export const actualizarMedico = (
  id: number,
  datos: NuevoMedico
): Medico | undefined => {
  const indice = medicos.findIndex((medico) => medico.id === id);

  if (indice === -1) {
    return undefined;
  }

  medicos[indice] = {
    id: id,
    matricula: datos.matricula,
    nombreCompleto: datos.nombreCompleto,
    especialidad: datos.especialidad,
    aniosExperiencia: datos.aniosExperiencia
  };

  return medicos[indice];
};

export const eliminarMedico = (id: number): boolean => {
  const indice = medicos.findIndex((medico) => medico.id === id);

  if (indice === -1) {
    return false;
  }

  medicos.splice(indice, 1);

  return true;
};