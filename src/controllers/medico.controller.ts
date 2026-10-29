import { Request, Response } from "express";
import {
  obtenerMedicos,
  obtenerMedicoPorId,
  crearMedico,
  actualizarMedico,
  eliminarMedico
} from "../data/medico.data";
import { NuevoMedico } from "../interfaces/medico.interface";

export const listarMedicos = (_req: Request, res: Response): void => {
  res.json(obtenerMedicos());
};

export const buscarMedico = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const medico = obtenerMedicoPorId(id);

  if (medico === undefined) {
    res.status(404).json({
      mensaje: "Médico no encontrado"
    });
    return;
  }

  res.json(medico);
};

export const registrarMedico = (req: Request, res: Response): void => {
  const datos: NuevoMedico = req.body;
  const nuevoMedico = crearMedico(datos);

  res.status(201).json(nuevoMedico);
};

export const modificarMedico = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const datos: NuevoMedico = req.body;
  const medicoActualizado = actualizarMedico(id, datos);

  if (medicoActualizado === undefined) {
    res.status(404).json({
      mensaje: "Médico no encontrado"
    });
    return;
  }

  res.json(medicoActualizado);
};

export const borrarMedico = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const eliminado = eliminarMedico(id);

  if (!eliminado) {
    res.status(404).json({
      mensaje: "Médico no encontrado"
    });
    return;
  }

  res.json({
    mensaje: "Médico eliminado correctamente"
  });
};