import { Request, Response, NextFunction } from "express";
import { NuevoMedico } from "../interfaces/medico.interface";

export const validarMedico = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const datos: NuevoMedico = req.body;

  if (
    !datos.matricula ||
    !datos.nombreCompleto ||
    !datos.especialidad ||
    datos.aniosExperiencia === undefined
  ) {
    res.status(400).json({
      mensaje: "Todos los campos son obligatorios"
    });
    return;
  }

  if (
    typeof datos.matricula !== "string" ||
    typeof datos.nombreCompleto !== "string" ||
    typeof datos.especialidad !== "string"
  ) {
    res.status(400).json({
      mensaje: "La matrícula, el nombre y la especialidad deben ser textos"
    });
    return;
  }

  if (
    typeof datos.aniosExperiencia !== "number" ||
    datos.aniosExperiencia < 0
  ) {
    res.status(400).json({
      mensaje: "Los años de experiencia deben ser un número igual o mayor que cero"
    });
    return;
  }

  next();
};