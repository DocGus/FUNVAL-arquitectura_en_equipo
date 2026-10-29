
import type { Request, Response } from "express";
import type { Paciente } from "../interfaces/Paciente";
import { pacientes, obtenerSiguienteId } from "../data/pacientes";

export function listarPacientes(_req: Request, res: Response): void {
  res.status(200).json(pacientes);
}

export function obtenerPacientePorId(req: Request, res: Response): void {
  const id = Number(req.params.id);

  const paciente = pacientes.find((item) => item.id === id);

  if (!paciente) {
    res.status(404).json({ mensaje: "Paciente no encontrado." });
    return;
  }

  res.status(200).json(paciente);
}

export function crearPaciente(req: Request, res: Response): void {
  const nuevoPaciente: Paciente = {
    id: obtenerSiguienteId(),
    dni: req.body.dni.trim(),
    nombre: req.body.nombre.trim(),
    edad: req.body.edad,
    telefono: req.body.telefono.trim(),
    obraSocial: req.body.obraSocial,
  };

  const dniExistente = pacientes.some(
    (paciente) => paciente.dni === nuevoPaciente.dni,
  );

  if (dniExistente) {
    res.status(409).json({ mensaje: "Ya existe un paciente con ese DNI." });
    return;
  }

  pacientes.push(nuevoPaciente);

  res.status(201).json({
    mensaje: "Paciente creado correctamente.",
    paciente: nuevoPaciente,
  });
}

export function actualizarPaciente(req: Request, res: Response): void {
  const id = Number(req.params.id);

  const indice = pacientes.findIndex((item) => item.id === id);

  if (indice === -1) {
    res.status(404).json({ mensaje: "Paciente no encontrado." });
    return;
  }

  const dni = req.body.dni.trim();

  const dniDuplicado = pacientes.some(
    (paciente) => paciente.dni === dni && paciente.id !== id,
  );

  if (dniDuplicado) {
    res.status(409).json({ mensaje: "Otro paciente ya utiliza ese DNI." });
    return;
  }

  const pacienteActualizado: Paciente = {
    id,
    dni,
    nombre: req.body.nombre.trim(),
    edad: req.body.edad,
    telefono: req.body.telefono.trim(),
    obraSocial: req.body.obraSocial,
  };

  pacientes[indice] = pacienteActualizado;

  res.status(200).json({
    mensaje: "Paciente actualizado correctamente.",
    paciente: pacienteActualizado,
  });
}

export function eliminarPaciente(req: Request, res: Response): void {
  const id = Number(req.params.id);

  const indice = pacientes.findIndex((item) => item.id === id);

  if (indice === -1) {
    res.status(404).json({ mensaje: "Paciente no encontrado." });
    return;
  }

  pacientes.splice(indice, 1);

  res.status(200).json({ mensaje: "Paciente eliminado correctamente." });
}

