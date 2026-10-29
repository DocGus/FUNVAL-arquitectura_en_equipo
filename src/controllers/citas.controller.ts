import { Request, Response } from "express";
import { citasMedicas } from "../data/citas.data";
import {
  CitaMedica,
  CrearCitaInput,
  EstadoCita
} from "../interfaces/cita.interface";

const estadosValidos: EstadoCita[] = ["pendiente", "atendido"];

function esNumeroEnteroPositivo(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

function esFechaValida(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function validarCitaInput(
  body: Partial<CrearCitaInput>
): string | undefined {
  if (!esNumeroEnteroPositivo(body.pacienteId)) {
    return "pacienteId debe ser un número entero positivo";
  }
  if (!esNumeroEnteroPositivo(body.medicoId)) {
    return "medicoId debe ser un número entero positivo";
  }
  if (!esFechaValida(body.fechaHora)) {
    return "fechaHora debe ser una fecha válida en formato ISO 8601";
  }
  if (body.estado !== undefined && !estadosValidos.includes(body.estado)) {
    return "estado debe ser 'pendiente' o 'atendido'";
  }
  return undefined;
}

export function listarCitas(req: Request, res: Response): void {
  const { estado, pacienteId, medicoId } = req.query;
  let resultado = citasMedicas;

  if (estado !== undefined) {
    if (typeof estado !== "string" || !estadosValidos.includes(estado as EstadoCita)) {
      res.status(400).json({ error: "estado debe ser 'pendiente' o 'atendido'" });
      return;
    }
    resultado = resultado.filter((cita) => cita.estado === estado);
  }

  if (pacienteId !== undefined) {
    const paciente = Number(pacienteId);
    if (!esNumeroEnteroPositivo(paciente)) {
      res.status(400).json({ error: "pacienteId debe ser un número entero positivo" });
      return;
    }
    resultado = resultado.filter((cita) => cita.pacienteId === paciente);
  }

  if (medicoId !== undefined) {
    const medico = Number(medicoId);
    if (!esNumeroEnteroPositivo(medico)) {
      res.status(400).json({ error: "medicoId debe ser un número entero positivo" });
      return;
    }
    resultado = resultado.filter((cita) => cita.medicoId === medico);
  }

  res.json(resultado);
}

export function obtenerCita(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const cita = citasMedicas.find((item) => item.id === id);

  if (!esNumeroEnteroPositivo(id) || !cita) {
    res.status(404).json({ error: "Cita médica no encontrada" });
    return;
  }

  res.json(cita);
}

export function crearCita(req: Request, res: Response): void {
  const body = req.body as Partial<CrearCitaInput>;
  const error = validarCitaInput(body);

  if (error) {
    res.status(400).json({ error });
    return;
  }

  const nuevaCita: CitaMedica = {
    id: citasMedicas.length > 0
      ? Math.max(...citasMedicas.map((cita) => cita.id)) + 1
      : 1,
    pacienteId: body.pacienteId as number,
    medicoId: body.medicoId as number,
    fechaHora: new Date(body.fechaHora as string).toISOString(),
    estado: body.estado ?? "pendiente"
  };

  citasMedicas.push(nuevaCita);
  res.status(201).json(nuevaCita);
}

export function actualizarCita(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const cita = citasMedicas.find((item) => item.id === id);

  if (!esNumeroEnteroPositivo(id) || !cita) {
    res.status(404).json({ error: "Cita médica no encontrada" });
    return;
  }

  const body = req.body as Partial<CrearCitaInput>;
  const error = validarCitaInput({
    pacienteId: body.pacienteId ?? cita.pacienteId,
    medicoId: body.medicoId ?? cita.medicoId,
    fechaHora: body.fechaHora ?? cita.fechaHora,
    estado: body.estado ?? cita.estado
  });

  if (error) {
    res.status(400).json({ error });
    return;
  }

  cita.pacienteId = body.pacienteId ?? cita.pacienteId;
  cita.medicoId = body.medicoId ?? cita.medicoId;
  cita.fechaHora = body.fechaHora
    ? new Date(body.fechaHora).toISOString()
    : cita.fechaHora;
  cita.estado = body.estado ?? cita.estado;

  res.json(cita);
}

export function eliminarCita(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const indice = citasMedicas.findIndex((item) => item.id === id);

  if (!esNumeroEnteroPositivo(id) || indice === -1) {
    res.status(404).json({ error: "Cita médica no encontrada" });
    return;
  }

  citasMedicas.splice(indice, 1);
  res.status(204).send();
}
