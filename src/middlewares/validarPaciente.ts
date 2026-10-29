
import type { Request, Response, NextFunction } from "express";
import type { Paciente } from "../interfaces/Paciente";

export function validarPaciente(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { dni, nombre, edad, telefono, obraSocial } = req.body as Partial<Paciente>;

  const errores: string[] = [];

  if (typeof dni !== "string" || dni.trim() === "") {
    errores.push("El DNI es obligatorio y debe ser texto.");
  }

  if (typeof nombre !== "string" || nombre.trim() === "") {
    errores.push("El nombre es obligatorio y debe ser texto.");
  }

  if (typeof edad !== "number" || !Number.isInteger(edad) || edad < 0) {
    errores.push("La edad debe ser un número entero mayor o igual a cero.");
  }

  if (typeof telefono !== "string" || telefono.trim() === "") {
    errores.push("El teléfono es obligatorio y debe ser texto.");
  }

  if (typeof obraSocial !== "boolean") {
    errores.push("obraSocial debe ser true o false.");
  }

  if (errores.length > 0) {
    res.status(400).json({ errores });
    return;
  }

  next();
}
